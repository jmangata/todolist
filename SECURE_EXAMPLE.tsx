// ==============================================
// EXEMPLE DE CODE SÉCURISÉ
// Version améliorée du composant _layout.tsx
// ==============================================

import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import Header from '@/components/Header'
import List from '@/components/List'
import { store } from '../store/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { ajouter } from '@/app/store/slices/taskSlice'

// ====== IMPORTS SÉCURITÉ ======
// Installation requise:
// npm install uuid react-native-get-random-values
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// ====== CONSTANTES DE SÉCURITÉ ======
const MAX_TASK_LENGTH = 500;
const MAX_TASKS_TOTAL = 1000;
const MAX_ACTIONS_PER_SECOND = 5;

// ====== RATE LIMITER ======
class RateLimiter {
  private actions: number[] = [];
  private readonly maxActions: number;
  private readonly timeWindow: number;

  constructor(maxActions: number = 5, timeWindowMs: number = 1000) {
    this.maxActions = maxActions;
    this.timeWindow = timeWindowMs;
  }

  canPerformAction(): boolean {
    const now = Date.now();
    this.actions = this.actions.filter(time => now - time < this.timeWindow);