# 🔐 Guide de Test de Sécurité - TodoList App

## 📖 Introduction

Ce guide vous permet de tester la sécurité de votre application TodoList en vous mettant dans la peau d'un attaquant. L'objectif est d'identifier les vulnérabilités **avant** qu'un véritable hacker ne les exploite.

## 🎯 Objectifs des tests

1. **Identifier les failles** de sécurité
2. **Comprendre les vecteurs d'attaque** possibles
3. **Prioriser les corrections** selon la criticité
4. **Améliorer** la posture de sécurité globale

## 🚀 Démarrage rapide

### Étape 1 : Audit automatisé des dépendances

```bash
# Windows
run-security-audit.bat

# macOS/Linux
npm audit
npm audit fix
```

### Étape 2 : Tests manuels

Ouvrez le React Native Debugger et exécutez :

```bash
# Dans la console du debugger
# Copier-coller le contenu de security-tests.js
```

### Étape 3 : Analyser les résultats

Consultez `SECURITY_AUDIT.md` pour :
- Les vulnérabilités détectées
- Les recommandations de correction
- Le plan d'action prioritaire

## 📋 Checklist des tests

### ✅ Tests de base (30 min)

- [ ] **Audit npm** : Vérifier les CVE connues
- [ ] **Test XSS** : Injecter du HTML/JavaScript
- [ ] **Test DOS** : Surcharger avec 10000+ tâches
- [ ] **Collision ID** : Créer des IDs dupliqués
- [ ] **Validation** : Tester entrées vides/nulles/très longues

### 🔬 Tests avancés (2-3h)

- [ ] **Reverse engineering** : Décompiler l'APK/IPA
- [ ] **Memory profiling** : Détecter les fuites mémoire
- [ ] **Redux manipulation** : Accéder au store en debug
- [ ] **Performance** : Tester avec datasets massifs
- [ ] **Root detection** : Tester sur appareil rooté/jailbreaké

### 🎓 Tests experts (1 journée)

- [ ] **Frida hooking** : Instrumenter l'app en runtime
- [ ] **Network analysis** : MITM avec Burp Suite (si API)
- [ ] **MobSF scan** : Analyse statique/dynamique complète
- [ ] **Fuzzing** : Tests aléatoires automatisés
- [ ] **Code obfuscation** : Vérifier la protection du code

## 🛠️ Outils nécessaires

### Installation des outils

```bash
# React Native Debugger
# Télécharger depuis : https://github.com/jhen0409/react-native-debugger

# Flipper (outil officiel Meta)
# https://fbflipper.com/

# Snyk (scan de vulnérabilités)
npm install -g snyk
snyk auth
snyk test

# License checker
npm install -g license-checker
```

## 📊 Scénarios de test détaillés

### Scénario 1 : Injection XSS

**Objectif :** Tenter d'exécuter du JavaScript malveillant

**Étapes :**
1. Ouvrir l'app et cliquer sur le bouton +
2. Taper : `<script>alert('Hacké!')</script>`
3. Valider la tâche
4. Observer le comportement

**Résultat attendu :**
- ✅ Le texte s'affiche tel quel (React échappe automatiquement)
- ❌ Une alerte JavaScript s'affiche (VULNÉRABLE)

### Scénario 2 : Déni de service

**Objectif :** Crasher l'app avec trop de données

**Étapes :**
1. Ouvrir React Native Debugger
2. Dans la console, exécuter :
```javascript
for(let i=0; i<50000; i++) {
  // Simuler l'ajout massif de tâches
  console.log('Tâche', i);
}
```
3. Observer la RAM et le CPU

**Résultat attendu :**
- ✅ L'app refuse après un certain nombre (protection DOS)
- ❌ L'app freeze ou crash (VULNÉRABLE)

### Scénario 3 : Manipulation du Store Redux

**Objectif :** Modifier directement l'état de l'app

**Étapes :**
1. Activer Redux DevTools
2. Aller dans l'onglet "Redux"
3. Dispatcher manuellement :
```javascript
{
  type: "task/ajouter",
  payload: {
    id: "hacked",
    title: "Injecté directement !",
    completed: true
  }
}
```

**Résultat attendu :**
- ✅ Redux DevTools désactivé en production
- ❌ L'action fonctionne (VULNÉRABLE en debug)

## 🔍 Interprétation des résultats

### Niveaux de criticité

| Niveau | Description | Action |
|--------|-------------|--------|
| 🔴 CRITIQUE | Exploitation facile, impact majeur | Corriger immédiatement |
| 🟠 ÉLEVÉ | Exploitation possible, impact significatif | Corriger avant release |
| 🟡 MOYEN | Exploitation complexe, impact limité | Corriger si temps disponible |
| 🟢 FAIBLE | Exploitation très difficile, impact minimal | Note pour futur |

### Métriques de sécurité

Après les tests, calculez votre score :

```
Score = (Vulnérabilités corrigées / Vulnérabilités totales) × 100
```

**Benchmarks :**
- < 50% : 🔴 Critique - Ne pas déployer
- 50-70% : 🟡 Moyen - Améliorer avant prod
- 70-90% : 🟢 Bon - Release possible avec monitoring
- > 90% : ✅ Excellent - Sécurité robuste

## 📝 Rapport de test

Utilisez ce template pour documenter vos tests :

```markdown
### Test : [Nom du test]
**Date :** YYYY-MM-DD
**Testeur :** [Votre nom]
**Version app :** 1.0.0

**Vulnérabilité détectée :** Oui / Non
**Criticité :** CRITIQUE / ÉLEVÉ / MOYEN / FAIBLE
**Description :** [Détails]
**Reproduction :** [Étapes]
**Impact :** [Conséquences]
**Recommandation :** [Solution]
```

## 🎓 Ressources d'apprentissage

### Livres recommandés
- "Mobile Application Penetration Testing" - Vijay Kumar
- "Android Hacker's Handbook" - Joshua J. Drake
- "iOS Hacker's Handbook" - Charlie Miller

### Cours en ligne
- [OWASP Mobile Security Testing Guide](https://owasp.org/www-project-mobile-security-testing-guide/)
- [HackerOne Mobile Hacking](https://www.hackerone.com/ethical-hacker/mobile-hacking)
- [Udemy - Mobile App Pentesting](https://www.udemy.com/topic/mobile-app-pentesting/)

### Labs de pratique
- [DVIA (Damn Vulnerable iOS App)](http://damnvulnerableiosapp.com/)
- [InsecureBankv2](https://github.com/dineshshetty/Android-InsecureBankv2)
- [OWASP MSTG Hacking Playground](https://github.com/OWASP/MSTG-Hacking-Playground)

## ⚖️ Considérations légales

### ⚠️ IMPORTANT

**TESTEZ UNIQUEMENT VOS PROPRES APPLICATIONS !**

- ✅ Tester votre propre app en dev/staging
- ✅ Tester avec autorisation écrite de l'entreprise
- ❌ Tester des apps tierces sans permission
- ❌ Exploiter des vulnérabilités sur des systèmes de production
- ❌ Partager publiquement des vulnérabilités non corrigées

**Divulgation responsable :**
Si vous trouvez une vulnérabilité sur une app tierce :
1. Contactez discrètement l'éditeur
2. Donnez un délai raisonnable de correction (90 jours)
3. Ne publiez qu'après correction ou expiration du délai

## 🚀 Prochaines étapes

Une fois les tests terminés :

1. **Prioriser** les vulnérabilités selon criticité
2. **Implémenter** les correctifs du fichier `SECURITY_AUDIT.md`
3. **Re-tester** après corrections
4. **Documenter** les changements
5. **Former** l'équipe aux bonnes pratiques
6. **Automatiser** les tests de sécurité dans CI/CD

## 📞 Support

**Questions sur les tests :**
- Consultez `SECURITY_AUDIT.md` pour les solutions détaillées
- Relancez `security-tests.js` pour des tests automatisés

**En cas de vulnérabilité critique découverte :**
1. Ne pas paniquer
2. Consulter la section "Corrections CRITIQUES" dans `SECURITY_AUDIT.md`
3. Implémenter les correctifs immédiatement
4. Re-tester pour vérifier

---

**Bon hacking éthique ! 🔒**

*Dernière mise à jour : 2026-01-19*
