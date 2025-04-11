const fs = require('fs');
const path = require('path');

// Path to the React Navigation elements directory
const elementsDir = path.join(__dirname, 'node_modules', '@react-navigation', 'elements', 'lib', 'module');

// Check if the directory exists
if (fs.existsSync(elementsDir)) {
  console.log('Patching React Navigation Elements...');
  
  // Path to the file that imports assets
  const headerFilePath = path.join(elementsDir, 'Header.js');
  
  if (fs.existsSync(headerFilePath)) {
    // Read the header file
    let headerContent = fs.readFileSync(headerFilePath, 'utf8');
    
    // Replace the asset imports with inline icon components
    headerContent = headerContent.replace(
      /import [^;]+ from ['"]\.\/assets\/[^'"]+['"]/g, 
      '// Asset imports removed'
    );
    
    // Replace asset usage with Material Icons
    headerContent = headerContent.replace(
      /<Image[^>]+source={[^}]+}[^>]*\/>/g,
      '<Text style={{fontSize: 24}}>⬅️</Text>'
    );
    
    // Write the modified file
    fs.writeFileSync(headerFilePath, headerContent);
    console.log('Successfully patched Header.js');
  }
  
  console.log('Patch complete!');
} else {
  console.error('React Navigation Elements directory not found!');
}