export function initializeApp(config) {
  if (!config.apiKey || !config.authDomain || !config.projectId) {
    throw new Error('Llama Auth SDK requires apiKey, authDomain, and projectId');
  }
  window.llamaAuthConfig = { ...config };
  return new LlamaAuthClient(config);
}

class LlamaAuthClient {
  constructor(config) {
    this.config = config;
  }

  async register(payload) {
    return this.request('/auth/register', payload);
  }

  async login(payload) {
    return this.request('/auth/login', payload);
  }

  async logout() {
    return this.request('/auth/logout', {});
  }

  async refresh(token) {
    return this.request('/auth/refresh', { token });
  }

  async me(token) {
    return this.request('/auth/me', {}, token);
  }

  async request(path, body, token) {
    const url = `${this.config.authDomain}${path}`;
    const headers = { 'Content-Type': 'application/json', 'x-api-key': this.config.apiKey };
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    return response.json();
  }
}

export function generateHTMLUI(options) {
  const theme = options.theme || '#ef4444';
  const radius = options.radius || 18;
  return `<div style="max-width:420px;margin:0 auto;font-family:Inter,system-ui,sans-serif;">
  <form id="llama-auth-form" style="background:#fff;border-radius:${radius}px;box-shadow:0 24px 60px rgba(15,23,42,.08);padding:32px;">
    <h2 style="margin:0 0 24px;color:#111;">Sign in to your app</h2>
    <input type="email" name="email" placeholder="Email" style="width:100%;padding:14px;margin-bottom:16px;border-radius:14px;border:1px solid #d1d5db;" />
    <input type="password" name="password" placeholder="Password" style="width:100%;padding:14px;margin-bottom:24px;border-radius:14px;border:1px solid #d1d5db;" />
    <button style="width:100%;padding:14px;border:none;border-radius:14px;background:${theme};color:#fff;font-weight:700;">Continue</button>
    <p style="margin-top:18px;color:#6b7280;font-size:0.9rem;">Powered by Llama Auth</p>
  </form>
</div>`;
}

export function generateReactUI(options) {
  return `import React from 'react';

export function LlamaAuthForm() {
  async function submit(event) {
    event.preventDefault();
    const body = { email: event.target.email.value, password: event.target.password.value };
    const response = await fetch(window.llamaAuthConfig.authDomain + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    console.log(await response.json());
  }

  return (
    <form onSubmit={submit} style={{ background: '#fff', borderRadius: ${options.radius || 18}, padding: 32, boxShadow: '0 24px 60px rgba(15,23,42,.08)' }}>
      <h2>Sign in to your app</h2>
      <input name="email" type="email" placeholder="Email" style={{ width: '100%', padding: 14, marginBottom: 16, borderRadius: 14, border: '1px solid #d1d5db' }} />
      <input name="password" type="password" placeholder="Password" style={{ width: '100%', padding: 14, marginBottom: 24, borderRadius: 14, border: '1px solid #d1d5db' }} />
      <button style={{ width: '100%', padding: 14, background: '${options.theme || '#ef4444'}', color: '#fff', border: 'none', borderRadius: 14 }}>Continue</button>
      <p style={{ marginTop: 18, color: '#6b7280', fontSize: 14 }}>Powered by Llama Auth</p>
    </form>
  );
}
`;
}

export function generateVueUI(options) {
  return `<template>
  <form class="llama-auth-form" @submit.prevent="submit">
    <h2>Sign in to your app</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Continue</button>
    <p>Powered by Llama Auth</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
const email = ref('');
const password = ref('');

async function submit() {
  const response = await fetch(window.llamaAuthConfig.authDomain + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value }),
  });
  console.log(await response.json());
}
</script>

<style>
.llama-auth-form { max-width: 420px; margin: 0 auto; padding: 32px; border-radius: ${options.radius || 18}px; background: #fff; box-shadow: 0 24px 60px rgba(15,23,42,.08); font-family: Inter,system-ui,sans-serif; }
.llama-auth-form input { width: 100%; padding: 14px; margin-bottom: 16px; border-radius: 14px; border: 1px solid #d1d5db; }
.llama-auth-form button { width: 100%; padding: 14px; border-radius: 14px; background: ${options.theme || '#ef4444'}; color: #fff; border: none; font-weight: 700; }
</style>`;
}

export function generateReactNativeUI(options) {
  return `import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export function LlamaAuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    const response = await fetch(window.llamaAuthConfig.authDomain + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    console.log(await response.json());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to your app</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} keyboardType="email-address" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry style={styles.input} />
      <TouchableOpacity onPress={submit} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.powered}>Powered by Llama Auth</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f7f8fb' },
  title: { marginBottom: 24, fontSize: 24, fontWeight: '700', color: '#111' },
  input: { width: '100%', padding: 14, marginBottom: 16, borderRadius: ${options.radius || 18}, borderColor: '#d1d5db', borderWidth: 1, backgroundColor: '#fff' },
  button: { width: '100%', padding: 14, borderRadius: ${options.radius || 18}, backgroundColor: '${options.theme || '#ef4444'}', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  powered: { marginTop: 16, color: '#6b7280' },
});
`;
}
