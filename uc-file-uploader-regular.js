class UCConfig extends HTMLElement {
  connectedCallback() {
    const ctxName = this.getAttribute('ctx-name');
    const sourceList = this.getAttribute('source-list') || 'local';
    const pubkey = this.getAttribute('pubkey');
    window.ucUploaderConfig = window.ucUploaderConfig || {};
    window.ucUploaderConfig[ctxName] = { sourceList: sourceList.split(',').map((v) => v.trim()), pubkey };
  }
}

class UcFileUploaderRegular extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = { files: [], error: null, uploading: false };
  }

  connectedCallback() {
    this.render();
  }

  get config() {
    const ctxName = this.getAttribute('ctx-name');
    return window.ucUploaderConfig?.[ctxName] || {};
  }

  async selectFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      await this.uploadFile(file);
    };
    input.click();
  }

  async uploadFile(file) {
    const authDomain = window.llamaAuthConfig?.authDomain;
    const apiKey = this.config.pubkey;
    if (!authDomain || !apiKey) {
      this.updateState({ error: 'Missing authDomain or pubkey configuration.' });
      return;
    }
    if (file.size > 500 * 1024 * 1024) {
      this.updateState({ error: 'File exceeds maximum size of 500 MB.' });
      return;
    }
    this.updateState({ uploading: true, error: null });
    const form = new FormData();
    form.append('file', file);
    try {
      const response = await fetch(`${authDomain}/storage/upload`, {
        method: 'POST',
        headers: { 'x-api-key': apiKey },
        body: form,
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'Upload failed');
      this.updateState({ files: [...this.state.files, json.file], uploading: false, error: null });
    } catch (error) {
      this.updateState({ error: error.message, uploading: false });
    }
  }

  updateState(changes) {
    this.state = { ...this.state, ...changes };
    this.render();
  }

  render() {
    const { files, uploading, error } = this.state;
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: Inter, system-ui, sans-serif; }
        .uploader { background:#fff; border-radius:28px; padding:24px; box-shadow:0 28px 80px rgba(15,23,42,.08); }
        .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
        .title { font-size:1.05rem; font-weight:700; color:#111827; }
        .button { border:none; border-radius:16px; padding:12px 18px; background:#ef4444; color:#fff; font-weight:700; cursor:pointer; }
        .info { color:#6b7280; font-size:.95rem; margin-top:4px; }
        .list { margin:20px 0 0; padding:0; list-style:none; }
        .item { display:flex; justify-content:space-between; padding:14px 16px; border-radius:18px; border:1px solid #e2e8f0; margin-bottom:10px; }
        .error { color:#b91c1c; margin-top:14px; }
        .powered { margin-top:20px; font-size:.88rem; color:#6b7280; text-align:right; }
      </style>
      <div class="uploader">
        <div class="header"><div><div class="title">File uploader</div><div class="info">Supports device, camera, drive, and network sources.</div></div><button class="button" ${uploading ? 'disabled' : ''}>${uploading ? 'Uploading...' : 'Select file'}</button></div>
        ${error ? `<div class="error">${error}</div>` : ''}
        <ul class="list">
          ${files.map((file) => `<li class="item"><span>${file.filename}</span><span>${(file.sizeBytes / 1024 / 1024).toFixed(2)} MB</span></li>`).join('')}
        </ul>
        <div class="powered">Powered by Llama Auth</div>
      </div>
    `;
    this.shadowRoot.querySelector('.button').onclick = () => this.selectFile();
  }
}

customElements.define('uc-config', UCConfig);
customElements.define('uc-file-uploader-regular', UcFileUploaderRegular);
customElements.define('uc-upload-ctx-provider', class extends HTMLElement {});
