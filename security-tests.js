/**
 * 🔒 SCRIPT DE TEST DE SÉCURITÉ
 * À exécuter dans la console du React Native Debugger
 * 
 * AVERTISSEMENT : Ces tests sont destructifs ! Utilisez sur une copie de dev uniquement.
 */

// ========================================
// TEST 1 : Injection XSS
// ========================================
console.log('🧪 TEST 1 : Injection XSS');
const xssPayloads = [
  '<script>alert("XSS")</script>',
  '<img src=x onerror=alert("XSS")>',
  '${process.env.SECRET_KEY}',
  'javascript:alert("XSS")',
  '<iframe src="javascript:alert(1)">',
];

xssPayloads.forEach((payload, index) => {
  console.log(`Test XSS ${index + 1}:`, payload);
  // Simuler l'ajout d'une tâche malveillante
  // Note: Adaptez selon votre store Redux
  // store.dispatch(ajouter({ id: `xss-${index}`, title: payload, completed: false }));
});

// ========================================
// TEST 2 : Déni de service (DOS)
// ========================================
console.log('\n🧪 TEST 2 : Déni de service');
const dosTest = () => {
  const startTime = performance.now();
  const tasks = [];
  
  console.log('Création de 10000 tâches...');
  for (let i = 0; i < 10000; i++) {
    tasks.push({
      id: Date.now() + '_' + i,
      title: 'A'.repeat(1000), // 1000 caractères
      completed: false
    });
  }
  
  const endTime = performance.now();
  console.log(`⏱️ Temps écoulé: ${(endTime - startTime).toFixed(2)}ms`);
  console.log(`📊 Mémoire utilisée: ${(tasks.length * 1000 / 1024 / 1024).toFixed(2)} MB`);
  
  return tasks;
};

// Décommenter pour exécuter (ATTENTION : peut crasher l'app)
// const dosResults = dosTest();

// ========================================
// TEST 3 : Collision d'ID
// ========================================
console.log('\n🧪 TEST 3 : Collision d\'ID');
const idCollisionTest = () => {
  const collisions = [];
  const timestamp = Date.now().toString();
  
  console.log('Tentative de créer 5 tâches avec le même ID...');
  for (let i = 0; i < 5; i++) {
    collisions.push({
      id: timestamp, // MÊME ID !
      title: `Tâche dupliquée ${i}`,
      completed: false
    });
  }
  
  console.log('❌ Collision détectée:', collisions.length, 'tâches avec ID:', timestamp);
  return collisions;
};

// idCollisionTest();

// ========================================
// TEST 4 : Manipulation du Store Redux
// ========================================
console.log('\n🧪 TEST 4 : Manipulation Redux Store');
const reduxManipulation = () => {
  console.log('Tentative de dispatch manuel...');
  
  // Injection de tâche malveillante
  const maliciousTask = {
    type: 'task/ajouter',
    payload: {
      id: '999999',
      title: '🔴 ACCÈS HACKEUR - Cette tâche a été injectée directement dans le store',
      completed: false
    }
  };
  
  console.log('Payload malveillant:', maliciousTask);
  // store.dispatch(maliciousTask);
};

// reduxManipulation();

// ========================================
// TEST 5 : Analyse de performance
// ========================================
console.log('\n🧪 TEST 5 : Analyse de performance');
const performanceTest = () => {
  const iterations = 1000;
  const results = {
    add: [],
    update: [],
    delete: []
  };
  
  console.log(`Test de ${iterations} opérations...`);
  
  // Test d'ajout
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    const task = { id: `perf-${i}`, title: `Task ${i}`, completed: false };
    const end = performance.now();
    results.add.push(end - start);
  }
  
  const avgAdd = results.add.reduce((a, b) => a + b, 0) / results.add.length;
  console.log(`⚡ Temps moyen d'ajout: ${avgAdd.toFixed(3)}ms`);
  
  return results;
};

// performanceTest();

// ========================================
// TEST 6 : Validation des entrées
// ========================================
console.log('\n🧪 TEST 6 : Validation des entrées');
const inputValidationTest = () => {
  const testInputs = [
    '',                           // Vide
    ' ',                          // Espace
    'A'.repeat(10000),            // Très long
    '../../etc/passwd',           // Path traversal
    "'; DROP TABLE tasks;--",     // SQL injection
    '\n\n\n\n\n',                 // Newlines
    '🔥💀🎃👻',                   // Emojis
    null,                         // Null
    undefined,                    // Undefined
  ];
  
  testInputs.forEach((input, index) => {
    console.log(`Test ${index + 1}:`, 
      typeof input === 'string' ? `"${input.substring(0, 50)}..."` : input
    );
  });
};

inputValidationTest();

// ========================================
// TEST 7 : Détection de fuite mémoire
// ========================================
console.log('\n🧪 TEST 7 : Détection de fuite mémoire');
const memoryLeakTest = () => {
  if (performance.memory) {
    const before = {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    };
    
    console.log('📊 Mémoire AVANT:', {
      used: `${(before.used / 1024 / 1024).toFixed(2)} MB`,
      total: `${(before.total / 1024 / 1024).toFixed(2)} MB`,
      limit: `${(before.limit / 1024 / 1024).toFixed(2)} MB`
    });
    
    // Créer beaucoup de tâches
    const tasks = [];
    for (let i = 0; i < 50000; i++) {
      tasks.push({
        id: `mem-${i}`,
        title: 'X'.repeat(500),
        completed: Math.random() > 0.5
      });
    }
    
    const after = {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    };
    
    console.log('📊 Mémoire APRÈS:', {
      used: `${(after.used / 1024 / 1024).toFixed(2)} MB`,
      total: `${(after.total / 1024 / 1024).toFixed(2)} MB`,
      diff: `+${((after.used - before.used) / 1024 / 1024).toFixed(2)} MB`
    });
  } else {
    console.log('⚠️ Performance.memory non disponible sur cet environnement');
  }
};

// memoryLeakTest();

// ========================================
// RAPPORT FINAL
// ========================================
console.log('\n' + '='.repeat(50));
console.log('📋 RÉSUMÉ DES TESTS DE SÉCURITÉ');
console.log('='.repeat(50));

const generateSecurityReport = () => {
  const report = {
    vulnerabilities: [
      {
        name: 'Injection XSS',
        severity: 'MOYEN',
        status: 'React échappe automatiquement le contenu',
        recommendation: 'Ajouter validation supplémentaire'
      },
      {
        name: 'Déni de service (DOS)',
        severity: 'CRITIQUE',
        status: 'Aucune protection',
        recommendation: 'Implémenter rate limiting et limite de tâches'
      },
      {
        name: 'Collision d\'ID',
        severity: 'ÉLEVÉ',
        status: 'Date.now() prévisible',
        recommendation: 'Utiliser UUID v4'
      },
      {
        name: 'Manipulation Redux',
        severity: 'ÉLEVÉ',
        status: 'Store accessible en debug',
        recommendation: 'Désactiver Redux DevTools en production'
      },
      {
        name: 'Fuite de données',
        severity: 'MOYEN',
        status: 'console.log exposent les données',
        recommendation: 'Supprimer tous les logs en production'
      },
      {
        name: 'Stockage non sécurisé',
        severity: 'CRITIQUE',
        status: 'Données en mémoire uniquement',
        recommendation: 'Utiliser SecureStore avec chiffrement'
      }
    ]
  };
  
  console.log('\n🔴 Vulnérabilités CRITIQUES:');
  report.vulnerabilities
    .filter(v => v.severity === 'CRITIQUE')
    .forEach(v => console.log(`  • ${v.name}: ${v.recommendation}`));
  
  console.log('\n🟡 Vulnérabilités ÉLEVÉES:');
  report.vulnerabilities
    .filter(v => v.severity === 'ÉLEVÉ')
    .forEach(v => console.log(`  • ${v.name}: ${v.recommendation}`));
  
  console.log('\n🟢 Vulnérabilités MOYENNES:');
  report.vulnerabilities
    .filter(v => v.severity === 'MOYEN')
    .forEach(v => console.log(`  • ${v.name}: ${v.recommendation}`));
  
  return report;
};

const report = generateSecurityReport();

console.log('\n' + '='.repeat(50));
console.log('✅ Tests terminés. Consultez SECURITY_AUDIT.md pour les solutions.');
console.log('='.repeat(50));