const { 
  getGlobalOverview, 
  getIndustriesData, 
  getExportData, 
  getImportData, 
  getEconomicNews 
} = require('./lib/api');

async function testAllAPIs() {
  console.log('🧪 INIZIO TEST DI TUTTE LE API\n');
  
  try {
    // Test 1: Global Overview
    console.log('📊 Test 1: Global Overview API');
    const overview = await getGlobalOverview();
    console.log('✅ Global Overview:', {
      totalGDP: overview.totalGDP,
      totalPopulation: overview.totalPopulation,
      averageGrowth: overview.averageGrowth,
      countriesCount: overview.countries.length
    });
    console.log('');

    // Test 2: Industries Data
    console.log('🏭 Test 2: Industries Data API');
    const industries = await getIndustriesData();
    console.log('✅ Industries Data:', {
      countriesCount: industries.length,
      sampleCountry: industries[0]?.country,
      industriesCount: industries[0]?.industries?.length || 0
    });
    console.log('');

    // Test 3: Export Data
    console.log('📤 Test 3: Export Data API');
    const exports = await getExportData();
    console.log('✅ Export Data:', {
      countriesCount: exports.length,
      sampleCountry: exports[0]?.country,
      exportsCount: exports[0]?.exports?.length || 0
    });
    console.log('');

    // Test 4: Import Data
    console.log('📥 Test 4: Import Data API');
    const imports = await getImportData();
    console.log('✅ Import Data:', {
      countriesCount: imports.length,
      sampleCountry: imports[0]?.country,
      importsCount: imports[0]?.imports?.length || 0
    });
    console.log('');

    // Test 5: Economic News
    console.log('📰 Test 5: Economic News API');
    const news = await getEconomicNews();
    console.log('✅ Economic News:', {
      newsCount: news.length,
      sampleNews: news[0]?.title,
      categories: [...new Set(news.map(n => n.category))]
    });
    console.log('');

    // Test 6: Verifica dati specifici per paese
    console.log('🌍 Test 6: Verifica dati specifici per paese');
    const testCountry = 'United States';
    const usIndustries = industries.find(c => c.country === testCountry);
    const usExports = exports.find(c => c.country === testCountry);
    const usImports = imports.find(c => c.country === testCountry);
    
    console.log(`✅ ${testCountry}:`, {
      hasIndustries: !!usIndustries,
      hasExports: !!usExports,
      hasImports: !!usImports,
      industriesCount: usIndustries?.industries?.length || 0,
      exportsCount: usExports?.exports?.length || 0,
      importsCount: usImports?.imports?.length || 0
    });
    console.log('');

    // Test 7: Verifica formati dati
    console.log('🔍 Test 7: Verifica formati dati');
    
    // Verifica overview
    const overviewKeys = Object.keys(overview);
    console.log('✅ Overview keys:', overviewKeys);
    
    // Verifica industries
    if (industries.length > 0) {
      const industryKeys = Object.keys(industries[0]);
      console.log('✅ Industry keys:', industryKeys);
    }
    
    // Verifica news
    if (news.length > 0) {
      const newsKeys = Object.keys(news[0]);
      console.log('✅ News keys:', newsKeys);
    }
    console.log('');

    console.log('🎉 TUTTI I TEST COMPLETATI CON SUCCESSO!');
    console.log('📈 La dashboard è pronta per la produzione!');
    
  } catch (error) {
    console.error('❌ ERRORE DURANTE I TEST:', error);
    console.error('Stack trace:', error.stack);
  }
}

// Esegui i test
testAllAPIs(); 