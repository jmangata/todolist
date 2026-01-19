# 🔒 AUDIT DE SÉCURITÉ - Application TodoList

## 📋 Table des matières
1. [Analyse des vulnérabilités actuelles](#1-analyse-des-vulnérabilités-actuelles)
2. [Scénarios d'attaque (Pentest)](#2-scénarios-dattaque-pentest)
3. [Outils de test](#3-outils-de-test)
4. [Recommandations de sécurisation](#4-recommandations-de-sécurisation)
5. [Checklist de sécurité](#5-checklist-de-sécurité)

---

## 1. Analyse des vulnérabilités actuelles

### 🔴 CRITIQUE - Stockage des données

**Vulnérabilité :** Les données sont stockées uniquement en mémoire (Redux)
- ❌ Perte des données à chaque redémarrage de l'app
- ❌ Aucune persistance = pas de risque de vol, mais mauvaise UX
- ❌ Si vous ajoutez AsyncStorage/SecureStore plus tard, risques potentiels

**Test :**
```bash
# Vérifier si des données persistent après fermeture
1. Ajouter des tâches
2. Fermer complètement l'application
3. Rouvrir → Les données disparaissent
```

### 🟡 MOYEN - Injection de code

**Vulnérabilité :** Pas de validation/sanitization des entrées utilisateur
- ✅ React Native échappe automatiquement le contenu dans `<Text>`
- ⚠️ Mais possibilité d'injecter du code malveillant si intégration future avec WebView
- ⚠️ Pas de limite de caractères (DOS possible avec texte très long)

**Test d'injection :**
```javascript
// Tester ces entrées dans le champ de texte :
<script>alert('XSS')</script>
${process.env}
../../../etc/passwd
' OR 1=1--
<img src=x onerror=alert('XSS')>
```

### 🟡 MOYEN - Validation des données

**Vulnérabilité :** Aucune validation côté code
- ❌ Accepte n'importe quelle longueur de texte
- ❌ Pas de limite sur le nombre de tâches
- ❌ ID basé sur `Date.now()` (prévisible, risque de collision)

**Test :**
```javascript
// Test de surcharge mémoire
for(let i=0; i<10000; i++) {
  dispatch(ajouter({
    id: Date.now().toString() + i,
    title: 'A'.repeat(10000), // 10k caractères
    completed: false
  }));
}
```

### 🟢 FAIBLE - Console.log sensibles

**Vulnérabilité :** Logs en production
```javascript
// Dans taskSlice.ts, lignes dangereuses :
console.log('actions ajouter:', actions.payload)  // Expose les données
console.log('supprimer la tache', actions.payload)
```
- ⚠️ En production, un attaquant avec accès au débogueur peut voir toutes les actions

---

## 2. Scénarios d'attaque (Pentest)

### 🎯 Attaque 1 : Manipulation du Redux Store

**Objectif :** Modifier directement l'état Redux pour injecter des données

**Procédure :**
```javascript
// 1. Ouvrir React Native Debugger ou Flipper
// 2. Accéder au Redux DevTools
// 3. Dispatcher des actions manuellement

// Injection de tâche malveillante
dispatch({
  type: 'task/ajouter',
  payload: {
    id: '999999',
    title: 'TÂCHE HACKÉE - Accès root obtenu',
    completed: true
  }
});

// Suppression massive
dispatch({ type: 'task/supprimer', payload: 'all' });
```

**Impact :** Corruption des données, déni de service

### 🎯 Attaque 2 : Déni de service (DOS)

**Objectif :** Crasher l'application en surchargeant la mémoire

**Procédure :**
```javascript
// Script à exécuter dans la console du débogueur
const createMassiveTasks = () => {
  for(let i = 0; i < 100000; i++) {
    store.dispatch({
      type: 'task/ajouter',
      payload: {
        id: Date.now() + '_' + i,
        title: 'X'.repeat(50000), // 50k caractères par tâche
        completed: false
      }
    });
  }
};
createMassiveTasks();
```

**Impact :** Application freeze, crash, batterie épuisée

### 🎯 Attaque 3 : Collision d'ID

**Objectif :** Créer deux tâches avec le même ID

**Procédure :**
```javascript
// Créer deux tâches rapidement (même milliseconde)
const id = Date.now().toString();
dispatch(ajouter({ id, title: 'Tâche 1', completed: false }));
dispatch(ajouter({ id, title: 'Tâche 2', completed: false }));

// Résultat : comportement imprévisible lors de la modification/suppression
```

**Impact :** Perte de données, bugs critiques

### 🎯 Attaque 4 : Analyse du bundle JavaScript

**Objectif :** Extraire le code source de l'application

**Procédure :**
```bash
# 1. Télécharger l'APK (Android) ou IPA (iOS)

# 2. Extraire le bundle JavaScript
unzip app.apk
cd assets/

# 3. Analyser le code
cat index.android.bundle | grep -i "password\|secret\|api\|token"

# 4. Déobfusquer avec des outils
npm install -g react-native-decompiler
react-native-decompiler -i index.android.bundle -o ./output
```

**Impact :** Code source exposé, logique métier révélée

### 🎯 Attaque 5 : Man-in-the-Middle (Si API future)

**Objectif :** Intercepter les communications réseau

**Procédure :**
```bash
# 1. Installer un proxy (Burp Suite, Charles Proxy, mitmproxy)
mitmproxy -p 8080

# 2. Configurer le device pour utiliser le proxy

# 3. Intercepter et modifier les requêtes
# Actuellement non applicable (pas d'API), mais critique pour le futur
```

**Impact :** Vol de données, modification des requêtes

---

## 3. Outils de test

### 🛠️ Outils d'analyse statique

```bash
# 1. Audit de dépendances npm
npm audit
npm audit fix

# 2. Vérification des vulnérabilités connues
npm install -g snyk
snyk test

# 3. Analyse de code
npm install -g eslint-plugin-security
npx eslint . --ext .ts,.tsx
```

### 🛠️ Outils de débogage

```bash
# React Native Debugger
brew install --cask react-native-debugger  # macOS
# ou télécharger depuis GitHub

# Flipper (outil officiel Meta)
https://fbflipper.com/
```

### 🛠️ Outils de test de pénétration mobile

```bash
# MobSF (Mobile Security Framework)
docker pull opensecurity/mobile-security-framework-mobsf
docker run -it -p 8000:8000 opensecurity/mobile-security-framework-mobsf
```

### 🛠️ Outils de reverse engineering

```bash
# Jadx (Décompilateur Android)
brew install jadx
jadx app.apk

# Frida (Dynamic instrumentation)
pip install frida-tools
frida-ps -U  # Liste les process sur device
```

---

## 4. Recommandations de sécurisation

### ✅ Corrections CRITIQUES

#### 1. Sécuriser le stockage des données

**Problème actuel :** Données volatiles (mémoire uniquement)

**Solution :**
```typescript
// Installer expo-secure-store
npm install expo-secure-store

// Dans taskSlice.ts
import * as SecureStore from 'expo-secure-store';

export const taskSlice = createSlice({
  name: 'task',
  initialState: [],
  reducers: {
    ajouter: (state, actions) => {
      const newState = [...state, actions.payload];
      // Chiffrer avant stockage
      SecureStore.setItemAsync('tasks', JSON.stringify(newState));
      return newState;
    },
    // ... autres reducers
  },
});
```

#### 2. Validation et sanitization des entrées

**Solution :**
```typescript
// Créer un fichier utils/validation.ts
export const validateTaskInput = (input: string): string => {
  // Limite de caractères
  const MAX_LENGTH = 500;
  
  // Supprimer les caractères dangereux
  let sanitized = input
    .trim()
    .slice(0, MAX_LENGTH)
    .replace(/[<>]/g, ''); // Retire < et >
  
  return sanitized;
};

// Dans FormAdd.tsx / _layout.tsx
const addTodo = () => {
  const sanitizedText = validateTaskInput(textTache);
  
  if (sanitizedText.length === 0) {
    Alert.alert('Erreur', 'La tâche ne peut pas être vide');
    return;
  }
  
  const newTodo = {
    id: generateSecureId(), // Voir point 3
    title: sanitizedText,
    completed: false,
  };
  
  dispatch(ajouter(newTodo));
  setTextTache('');
};
```

#### 3. Génération d'ID sécurisée

**Problème :** `Date.now()` est prévisible

**Solution :**
```typescript
// utils/idGenerator.ts
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const generateSecureId = (): string => {
  return uuidv4(); // Génère un UUID v4 cryptographiquement sûr
};

// Installation
npm install uuid
npm install react-native-get-random-values
```

#### 4. Supprimer les console.log

**Solution :**
```typescript
// Créer utils/logger.ts
const isDevelopment = __DEV__;

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error(...args);
    }
  },
};

// Remplacer tous les console.log par logger.log
```

#### 5. Limiter le nombre de tâches

**Solution :**
```typescript
// Dans taskSlice.ts
const MAX_TASKS = 1000;

reducers: {
  ajouter: (state, actions) => {
    if (state.length >= MAX_TASKS) {
      throw new Error('Limite de tâches atteinte');
    }
    const newState = [...state, actions.payload];
    return newState;
  },
}
```

#### 6. Obfuscation du code (Production)

**Solution :**
```bash
# Installer Hermes (moteur JS optimisé et obfusqué)
# Déjà inclus dans Expo, activer dans app.json

# app.json
{
  "expo": {
    "jsEngine": "hermes",
    "android": {
      "enableProguard": true  // Obfuscation Android
    },
    "ios": {
      "bitcode": true
    }
  }
}

# Pour obfuscation avancée
npm install --save-dev javascript-obfuscator
```

#### 7. Protection contre le debug en production

**Solution :**
```typescript
// app/_layout.tsx
import { useEffect } from 'react';
import { Platform } from 'react-native';

useEffect(() => {
  if (!__DEV__ && Platform.OS !== 'web') {
    // Désactiver le débogage en production
    if (typeof global.console !== 'undefined') {
      global.console = {
        ...console,
        log: () => {},
        debug: () => {},
        info: () => {},
        warn: () => {},
      };
    }
  }
}, []);
```

### ✅ Corrections MOYENNES

#### 8. Implémenter un Rate Limiting

**Solution :**
```typescript
// utils/rateLimiter.ts
class RateLimiter {
  private actions: number[] = [];
  private readonly maxActions: number;
  private readonly timeWindow: number;

  constructor(maxActions: number = 10, timeWindowMs: number = 1000) {
    this.maxActions = maxActions;
    this.timeWindow = timeWindowMs;
  }

  canPerformAction(): boolean {
    const now = Date.now();
    this.actions = this.actions.filter(time => now - time < this.timeWindow);
    
    if (this.actions.length < this.maxActions) {
      this.actions.push(now);
      return true;
    }
    
    return false;
  }
}

export const taskRateLimiter = new RateLimiter(5, 1000); // 5 actions/seconde

// Utilisation dans FormAdd
const addTodo = () => {
  if (!taskRateLimiter.canPerformAction()) {
    Alert.alert('Erreur', 'Trop d\'actions rapides. Ralentissez.');
    return;
  }
  // ... reste du code
};
```

#### 9. Chiffrement des données sensibles (si applicable)

**Solution :**
```typescript
// utils/encryption.ts
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'votre-clé-secrète-changez-moi';

export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decrypt = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
```

#### 10. Détection de root/jailbreak

**Solution :**
```bash
npm install react-native-root-detection

# Dans App.tsx
import RNRootDetection from 'react-native-root-detection';

useEffect(() => {
  RNRootDetection.isRooted()
    .then(isRooted => {
      if (isRooted) {
        Alert.alert(
          'Appareil non sécurisé',
          'Cette app ne peut pas fonctionner sur un appareil rooté/jailbreaké'
        );
        // Bloquer l'accès ou limiter les fonctionnalités
      }
    });
}, []);
```

---

## 5. Checklist de sécurité

### 📝 Avant de déployer en production

- [ ] **Audit npm** : `npm audit` sans vulnérabilités critiques
- [ ] **Dépendances à jour** : Vérifier les CVE connues
- [ ] **Console.log supprimés** : Aucun log sensible en production
- [ ] **Validation des entrées** : Toutes les saisies utilisateur validées
- [ ] **Stockage sécurisé** : Utiliser SecureStore pour données sensibles
- [ ] **IDs cryptographiques** : UUID au lieu de Date.now()
- [ ] **Rate limiting** : Protection contre les abus
- [ ] **Obfuscation activée** : Hermes + ProGuard
- [ ] **Certificats SSL** : Si API, certificate pinning
- [ ] **Détection root/jailbreak** : Bloquer ou avertir
- [ ] **Permissions minimales** : Seulement les permissions nécessaires
- [ ] **Code signing** : Certificats valides iOS/Android
- [ ] **Tests de pénétration** : Scénarios d'attaque testés
- [ ] **Backup chiffré** : Si données sensibles
- [ ] **Session timeout** : Si authentification future

### 🧪 Tests à effectuer

```bash
# 1. Test de surcharge
# Ajouter 10000 tâches rapidement

# 2. Test d'injection
# Essayer <script>, ${}, SQL injection patterns

# 3. Test de collision ID
# Créer plusieurs tâches simultanément

# 4. Test de mémoire
# Monitorer l'utilisation RAM/CPU

# 5. Test de performance
# FlatList avec 1000+ items

# 6. Test de débogage
# Vérifier que Redux DevTools est désactivé en prod
```

---

## 📚 Ressources supplémentaires

### Documentation officielle
- [OWASP Mobile Security](https://owasp.org/www-project-mobile-security/)
- [React Native Security](https://reactnative.dev/docs/security)
- [Expo Security](https://docs.expo.dev/guides/security/)

### Outils recommandés
- **MobSF** : Analyse statique/dynamique
- **Frida** : Hooking et instrumentation
- **Burp Suite** : Proxy pour MITM
- **Snyk** : Scan de vulnérabilités
- **SonarQube** : Analyse de qualité de code

### Standards de sécurité
- **OWASP Mobile Top 10** : Les 10 vulnérabilités mobiles les plus courantes
- **MASVS** : Mobile Application Security Verification Standard
- **CWE** : Common Weakness Enumeration

---

## 🎯 Score de sécurité actuel

| Critère | Score | Commentaire |
|---------|-------|-------------|
| Stockage des données | 3/10 | En mémoire uniquement, pas de persistence |
| Validation des entrées | 4/10 | React échappe automatiquement, mais pas de validation |
| Authentification | N/A | Pas d'authentification |
| Chiffrement | 2/10 | Aucun chiffrement |
| Protection du code | 3/10 | Code non obfusqué |
| Gestion des erreurs | 5/10 | Logs exposés |
| Permissions | 8/10 | Minimales (pour l'instant) |
| Rate limiting | 1/10 | Aucune protection DOS |
| Détection fraude | 0/10 | Pas de détection root/jailbreak |

**Score global : 3.3/10** ⚠️

---

## 🚀 Plan d'action prioritaire

### Semaine 1 - Critique
1. ✅ Implémenter la validation des entrées
2. ✅ Remplacer Date.now() par UUID
3. ✅ Supprimer les console.log

### Semaine 2 - Important
4. ✅ Ajouter SecureStore pour persistance
5. ✅ Implémenter rate limiting
6. ✅ Activer Hermes et obfuscation

### Semaine 3 - Nice to have
7. ✅ Ajouter détection root/jailbreak
8. ✅ Tests de pénétration complets
9. ✅ Documentation de sécurité

---

**Dernière mise à jour :** 2026-01-19  
**Audité par :** Claude AI  
**Prochaine revue :** Après chaque nouvelle fonctionnalité
