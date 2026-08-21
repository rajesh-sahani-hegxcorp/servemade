const fs = require('fs');
const path = require('path');

const inputJson = [
  {
    "productFamily": "Double-Wall Paper Cup",
    "slug": "double-wall-paper-cup",
    "urlPath": "/products/double-wall-paper-cup",
    "category": "cups-lids",
    "categoryLabel": "Cups & Lids",
    "sourceSheetCategory": "Paper Cups",
    "sizeCount": 3,
    "variants": [
      {
        "size": "240 mL",
        "dimension": null,
        "capacityMl": 240,
        "capacityOz": 8.12,
        "qtyPerBox": 1000,
        "qtyPerPkt": 50
      },
      {
        "size": "360 mL",
        "dimension": null,
        "capacityMl": 360,
        "capacityOz": 12.17,
        "qtyPerBox": 500,
        "qtyPerPkt": 50
      },
      {
        "size": "480 mL",
        "dimension": null,
        "capacityMl": 480,
        "capacityOz": 16.23,
        "qtyPerBox": 500,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Kraft Paper Bowl with PET Lid",
    "slug": "kraft-paper-bowl-with-pet-lid",
    "urlPath": "/products/kraft-paper-bowl-with-pet-lid",
    "category": "cups-lids",
    "categoryLabel": "Cups & Lids",
    "sourceSheetCategory": "Paper Bowl with Lid (Kraft)",
    "sizeCount": 6,
    "variants": [
      {
        "size": "300 mL",
        "dimension": "110 mm diameter",
        "capacityMl": 300,
        "capacityOz": 10.14,
        "qtyPerBox": 1000,
        "qtyPerPkt": 50
      },
      {
        "size": "500 mL",
        "dimension": "148 mm diameter",
        "capacityMl": 500,
        "capacityOz": 16.91,
        "qtyPerBox": 500,
        "qtyPerPkt": 50
      },
      {
        "size": "750 mL",
        "dimension": "148 mm diameter",
        "capacityMl": 750,
        "capacityOz": 25.36,
        "qtyPerBox": 500,
        "qtyPerPkt": 50
      },
      {
        "size": "1000 mL",
        "dimension": "148 mm diameter",
        "capacityMl": 1000,
        "capacityOz": 33.81,
        "qtyPerBox": 500,
        "qtyPerPkt": 50
      },
      {
        "size": "1000 mL",
        "dimension": "184 mm diameter",
        "capacityMl": 1000,
        "capacityOz": 33.81,
        "qtyPerBox": 500,
        "qtyPerPkt": 50
      },
      {
        "size": "1300 mL",
        "dimension": "184 mm diameter",
        "capacityMl": 1300,
        "capacityOz": 43.96,
        "qtyPerBox": 500,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Kraft Round Paper Container with Lid",
    "slug": "kraft-round-paper-container-with-lid",
    "urlPath": "/products/kraft-round-paper-container-with-lid",
    "category": "cups-lids",
    "categoryLabel": "Cups & Lids",
    "sourceSheetCategory": "Paper Container with Lid",
    "sizeCount": 4,
    "variants": [
      {
        "size": "300 mL",
        "dimension": "round",
        "capacityMl": 300,
        "capacityOz": 10.14,
        "qtyPerBox": 1000,
        "qtyPerPkt": 50
      },
      {
        "size": "400 mL",
        "dimension": "round",
        "capacityMl": 400,
        "capacityOz": 13.53,
        "qtyPerBox": 500,
        "qtyPerPkt": 50
      },
      {
        "size": "500 mL",
        "dimension": "round",
        "capacityMl": 500,
        "capacityOz": 16.91,
        "qtyPerBox": 500,
        "qtyPerPkt": 50
      },
      {
        "size": "750 mL",
        "dimension": "round",
        "capacityMl": 750,
        "capacityOz": 25.36,
        "qtyPerBox": 500,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Plain Round Paper Container with Lid",
    "slug": "plain-round-paper-container-with-lid",
    "urlPath": "/products/plain-round-paper-container-with-lid",
    "category": "cups-lids",
    "categoryLabel": "Cups & Lids",
    "sourceSheetCategory": "Paper Container with Lid",
    "sizeCount": 3,
    "variants": [
      {
        "size": "100 mL",
        "dimension": "round",
        "capacityMl": 100,
        "capacityOz": 3.38,
        "qtyPerBox": 2400,
        "qtyPerPkt": 50
      },
      {
        "size": "150 mL",
        "dimension": "round",
        "capacityMl": 150,
        "capacityOz": 5.07,
        "qtyPerBox": 2400,
        "qtyPerPkt": 50
      },
      {
        "size": "250 mL",
        "dimension": "round",
        "capacityMl": 250,
        "capacityOz": 8.45,
        "qtyPerBox": 1000,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Ripple Paper Cup",
    "slug": "ripple-paper-cup",
    "urlPath": "/products/ripple-paper-cup",
    "category": "cups-lids",
    "categoryLabel": "Cups & Lids",
    "sourceSheetCategory": "Paper Cups",
    "sizeCount": 4,
    "variants": [
      {
        "size": "150 mL",
        "dimension": null,
        "capacityMl": 150,
        "capacityOz": 5.07,
        "qtyPerBox": 3000,
        "qtyPerPkt": 50
      },
      {
        "size": "200 mL",
        "dimension": null,
        "capacityMl": 200,
        "capacityOz": 6.76,
        "qtyPerBox": 2500,
        "qtyPerPkt": 50
      },
      {
        "size": "250 mL",
        "dimension": null,
        "capacityMl": 250,
        "capacityOz": 8.45,
        "qtyPerBox": 2000,
        "qtyPerPkt": 50
      },
      {
        "size": "350 mL",
        "dimension": null,
        "capacityMl": 350,
        "capacityOz": 11.83,
        "qtyPerBox": 1000,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Bamboo Fruit Fork",
    "slug": "bamboo-fruit-fork",
    "urlPath": "/products/bamboo-fruit-fork",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sourceSheetCategory": "Wooden Spoon/Fork/Sticks Etc.",
    "sizeCount": 1,
    "variants": [
      {
        "size": "85 mm",
        "dimension": "85 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Bamboo Stick",
    "slug": "bamboo-stick",
    "urlPath": "/products/bamboo-stick",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sourceSheetCategory": "Wooden Spoon/Fork/Sticks Etc.",
    "sizeCount": 8,
    "variants": [
      {
        "size": "4 in",
        "dimension": "4 in x 2.5 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 65
      },
      {
        "size": "6 in",
        "dimension": "6 in x 2.5 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 65
      },
      {
        "size": "8 in",
        "dimension": "8 in x 3 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 60
      },
      {
        "size": "10 in",
        "dimension": "10 in x 3 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 60
      },
      {
        "size": "12 in",
        "dimension": "12 in x 3.5 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 50
      },
      {
        "size": "12 in",
        "dimension": "12 in x 5 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 40
      },
      {
        "size": "14 in",
        "dimension": "14 in",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 40
      },
      {
        "size": "16 in",
        "dimension": "16 in",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 40
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Chopsticks",
    "slug": "chopsticks",
    "urlPath": "/products/chopsticks",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sourceSheetCategory": "Wooden Spoon/Fork/Sticks Etc.",
    "sizeCount": 1,
    "variants": [
      {
        "size": "8 in / 20 cm",
        "dimension": "8 in / 20 cm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 100
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Coffee Stirrer",
    "slug": "coffee-stirrer",
    "urlPath": "/products/coffee-stirrer",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sourceSheetCategory": "Wooden Spoon/Fork/Sticks Etc.",
    "sizeCount": 1,
    "variants": [
      {
        "size": "14 cm",
        "dimension": "14 cm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 500
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Cornstarch Fork",
    "slug": "cornstarch-fork",
    "urlPath": "/products/cornstarch-fork",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sourceSheetCategory": "Biodegradable Cutlery - Cornstarch",
    "sizeCount": 1,
    "variants": [
      {
        "size": "160 mm",
        "dimension": "160 mm / 16 cm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 3000,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Cornstarch Spoon",
    "slug": "cornstarch-spoon",
    "urlPath": "/products/cornstarch-spoon",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sourceSheetCategory": "Biodegradable Cutlery - Cornstarch",
    "sizeCount": 1,
    "variants": [
      {
        "size": "160 mm",
        "dimension": "160 mm / 16 cm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 3000,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Gun Skewer",
    "slug": "gun-skewer",
    "urlPath": "/products/gun-skewer",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sourceSheetCategory": "Wooden Spoon/Fork/Sticks Etc.",
    "sizeCount": 1,
    "variants": [
      {
        "size": "9 cm",
        "dimension": "9 cm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 100
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Paper Straw",
    "slug": "paper-straw",
    "urlPath": "/products/paper-straw",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sourceSheetCategory": "Paper Straws",
    "sizeCount": 4,
    "variants": [
      {
        "size": "6 mm",
        "dimension": "6 mm dia x 197 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 100
      },
      {
        "size": "8 mm",
        "dimension": "8 mm dia x 197 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 100
      },
      {
        "size": "10 mm",
        "dimension": "10 mm dia x 197 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 50
      },
      {
        "size": "12 mm",
        "dimension": "12 mm dia x 197 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Round Liquor Stirrer",
    "slug": "round-liquor-stirrer",
    "urlPath": "/products/round-liquor-stirrer",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sourceSheetCategory": "Wooden Spoon/Fork/Sticks Etc.",
    "sizeCount": 1,
    "variants": [
      {
        "size": "8 in / 20 cm",
        "dimension": "8 in / 20 cm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Toothpick",
    "slug": "toothpick",
    "urlPath": "/products/toothpick",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sourceSheetCategory": "Wooden Spoon/Fork/Sticks Etc.",
    "sizeCount": 1,
    "variants": [
      {
        "size": "Not stated",
        "dimension": "not stated",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 10
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Wooden Spoon",
    "slug": "wooden-spoon",
    "urlPath": "/products/wooden-spoon",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sourceSheetCategory": "Wooden Spoon/Fork/Sticks Etc.",
    "sizeCount": 1,
    "variants": [
      {
        "size": "110 mm",
        "dimension": "110 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 10000,
        "qtyPerPkt": 100
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Wooden Spoon/Fork",
    "slug": "wooden-spoon-fork",
    "urlPath": "/products/wooden-spoon-fork",
    "category": "cutlery-straws",
    "categoryLabel": "Cutlery & Straws",
    "sizeCount": 2,
    "variants": [
      {
        "size": "140 mm",
        "dimension": "140 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 10000,
        "qtyPerPkt": 100
      },
      {
        "size": "160 mm",
        "dimension": "160 mm",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 10000,
        "qtyPerPkt": 100
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Chuk 3-Compartment Combo Meal Plate",
    "slug": "chuk-3-compartment-combo-meal-plate",
    "urlPath": "/products/chuk-3-compartment-combo-meal-plate",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Chuk",
    "sizeCount": 1,
    "variants": [
      {
        "size": "3 compartment",
        "dimension": null,
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 500,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Chuk 4-Compartment Meal Tray",
    "slug": "chuk-4-compartment-meal-tray",
    "urlPath": "/products/chuk-4-compartment-meal-tray",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Chuk",
    "sizeCount": 1,
    "variants": [
      {
        "size": "4 compartment",
        "dimension": null,
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 500,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Chuk 5-Compartment Meal Tray",
    "slug": "chuk-5-compartment-meal-tray",
    "urlPath": "/products/chuk-5-compartment-meal-tray",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Chuk",
    "sizeCount": 1,
    "variants": [
      {
        "size": "5 compartment",
        "dimension": null,
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 500,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Chuk Bowl",
    "slug": "chuk-bowl",
    "urlPath": "/products/chuk-bowl",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Chuk",
    "sizeCount": 3,
    "variants": [
      {
        "size": "120 mL",
        "dimension": null,
        "capacityMl": 120,
        "capacityOz": 4.06,
        "qtyPerBox": 1000,
        "qtyPerPkt": 25
      },
      {
        "size": "180 mL",
        "dimension": null,
        "capacityMl": 180,
        "capacityOz": 6.09,
        "qtyPerBox": 1000,
        "qtyPerPkt": 25
      },
      {
        "size": "250 mL",
        "dimension": null,
        "capacityMl": 250,
        "capacityOz": 8.45,
        "qtyPerBox": 1000,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Chuk Plate",
    "slug": "chuk-plate",
    "urlPath": "/products/chuk-plate",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Chuk",
    "sizeCount": 5,
    "variants": [
      {
        "size": "6 in",
        "dimension": "6 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 1000,
        "qtyPerPkt": 25
      },
      {
        "size": "7 in",
        "dimension": "7 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 1000,
        "qtyPerPkt": 25
      },
      {
        "size": "9 in",
        "dimension": "9 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 500,
        "qtyPerPkt": 25
      },
      {
        "size": "10 in",
        "dimension": "10 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 500,
        "qtyPerPkt": 25
      },
      {
        "size": "12 in",
        "dimension": "12 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 500,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Chuk Rectangular Container",
    "slug": "chuk-rectangular-container",
    "urlPath": "/products/chuk-rectangular-container",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Chuk",
    "sizeCount": 2,
    "variants": [
      {
        "size": "500 mL",
        "dimension": "rectangular",
        "capacityMl": 500,
        "capacityOz": 16.91,
        "qtyPerBox": 1000,
        "qtyPerPkt": 125
      },
      {
        "size": "750 mL",
        "dimension": "rectangular",
        "capacityMl": 750,
        "capacityOz": 25.36,
        "qtyPerBox": 500,
        "qtyPerPkt": 125
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Chuk Square Bowl",
    "slug": "chuk-square-bowl",
    "urlPath": "/products/chuk-square-bowl",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Chuk",
    "sizeCount": 1,
    "variants": [
      {
        "size": "4 in",
        "dimension": "4 in square",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 2000,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Ecolates 3-Compartment Round Plate",
    "slug": "ecolates-3-compartment-round-plate",
    "urlPath": "/products/ecolates-3-compartment-round-plate",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Ecolates",
    "sizeCount": 2,
    "variants": [
      {
        "size": "9 in / 3 compartment",
        "dimension": "9 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 1000,
        "qtyPerPkt": 25
      },
      {
        "size": "10 in / 3 compartment",
        "dimension": "10 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 1000,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Ecolates 3-Compartment Square Plate",
    "slug": "ecolates-3-compartment-square-plate",
    "urlPath": "/products/ecolates-3-compartment-square-plate",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Ecolates",
    "sizeCount": 1,
    "variants": [
      {
        "size": "9 in / 3 compartment",
        "dimension": "9 in square",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 1000,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Ecolates 4-Compartment Round Plate",
    "slug": "ecolates-4-compartment-round-plate",
    "urlPath": "/products/ecolates-4-compartment-round-plate",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Ecolates",
    "sizeCount": 2,
    "variants": [
      {
        "size": "11 in / 4 compartment",
        "dimension": "11 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 800,
        "qtyPerPkt": 25
      },
      {
        "size": "12 in / 4 compartment",
        "dimension": "12 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 600,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Ecolates 5-Compartment Meal Tray",
    "slug": "ecolates-5-compartment-meal-tray",
    "urlPath": "/products/ecolates-5-compartment-meal-tray",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Ecolates",
    "sizeCount": 1,
    "variants": [
      {
        "size": "5 compartment",
        "dimension": null,
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 500,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Ecolates Bowl",
    "slug": "ecolates-bowl",
    "urlPath": "/products/ecolates-bowl",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Ecolates",
    "sizeCount": 3,
    "variants": [
      {
        "size": "180 mL",
        "dimension": null,
        "capacityMl": 180,
        "capacityOz": 6.09,
        "qtyPerBox": 4000,
        "qtyPerPkt": 50
      },
      {
        "size": "240 mL",
        "dimension": null,
        "capacityMl": 240,
        "capacityOz": 8.12,
        "qtyPerBox": 4000,
        "qtyPerPkt": 50
      },
      {
        "size": "360 mL",
        "dimension": null,
        "capacityMl": 360,
        "capacityOz": 12.17,
        "qtyPerBox": 2000,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Ecolates Clamshell",
    "slug": "ecolates-clamshell",
    "urlPath": "/products/ecolates-clamshell",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Ecolates",
    "sizeCount": 2,
    "variants": [
      {
        "size": "6 x 6 in",
        "dimension": "6 x 6 in",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 500,
        "qtyPerPkt": 25
      },
      {
        "size": "9 x 6 in",
        "dimension": "9 x 6 in",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 250,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Ecolates Round Plate",
    "slug": "ecolates-round-plate",
    "urlPath": "/products/ecolates-round-plate",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Ecolates",
    "sizeCount": 7,
    "variants": [
      {
        "size": "4 in",
        "dimension": "4 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 4800,
        "qtyPerPkt": 25
      },
      {
        "size": "6 in",
        "dimension": "6 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 2000,
        "qtyPerPkt": 25
      },
      {
        "size": "7 in",
        "dimension": "7 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 1800,
        "qtyPerPkt": 25
      },
      {
        "size": "9 in",
        "dimension": "9 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 1000,
        "qtyPerPkt": 25
      },
      {
        "size": "10 in",
        "dimension": "10 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 1000,
        "qtyPerPkt": 25
      },
      {
        "size": "11 in",
        "dimension": "11 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 1000,
        "qtyPerPkt": 25
      },
      {
        "size": "12 in",
        "dimension": "12 in diameter",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 600,
        "qtyPerPkt": 25
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Ecolates Square Kiwi Bowl",
    "slug": "ecolates-square-kiwi-bowl",
    "urlPath": "/products/ecolates-square-kiwi-bowl",
    "category": "plates-bowls",
    "categoryLabel": "Plates & Bowls",
    "sourceSheetCategory": "Biodegradable Plate/Bowl - Ecolates",
    "sizeCount": 1,
    "variants": [
      {
        "size": "Kiwi",
        "dimension": "square",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 4000,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "3-Ply Corrugated Garlic Bread Box",
    "slug": "3-ply-corrugated-garlic-bread-box",
    "urlPath": "/products/3-ply-corrugated-garlic-bread-box",
    "category": "takeaway-boxes",
    "categoryLabel": "Takeaway Boxes",
    "sourceSheetCategory": "Paper Boxes",
    "sizeCount": 1,
    "variants": [
      {
        "size": "Not stated",
        "dimension": "not stated",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 100
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "3-Ply Corrugated Pizza Box",
    "slug": "3-ply-corrugated-pizza-box",
    "urlPath": "/products/3-ply-corrugated-pizza-box",
    "category": "takeaway-boxes",
    "categoryLabel": "Takeaway Boxes",
    "sourceSheetCategory": "Paper Boxes",
    "sizeCount": 4,
    "variants": [
      {
        "size": "7 x 7 x 1.5 in",
        "dimension": "7 x 7 x 1.5 in",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 100
      },
      {
        "size": "8 x 8 x 1.5 in",
        "dimension": "8 x 8 x 1.5 in",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 100
      },
      {
        "size": "10 x 10 x 1.5 in",
        "dimension": "10 x 10 x 1.5 in",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 50
      },
      {
        "size": "12 x 12 x 1.5 in",
        "dimension": "12 x 12 x 1.5 in",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Cornstarch 2-Compartment Rectangular Container with Lid",
    "slug": "cornstarch-2-compartment-rectangular-container-with-lid",
    "urlPath": "/products/cornstarch-2-compartment-rectangular-container-with-lid",
    "category": "takeaway-boxes",
    "categoryLabel": "Takeaway Boxes",
    "sourceSheetCategory": "Biodegradable Container - Cornstarch",
    "sizeCount": 1,
    "variants": [
      {
        "size": "2 compartment",
        "dimension": "rectangular",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 600,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Cornstarch 2-Compartment Round Bowl with Lid",
    "slug": "cornstarch-2-compartment-round-bowl-with-lid",
    "urlPath": "/products/cornstarch-2-compartment-round-bowl-with-lid",
    "category": "takeaway-boxes",
    "categoryLabel": "Takeaway Boxes",
    "sourceSheetCategory": "Biodegradable Container - Cornstarch",
    "sizeCount": 1,
    "variants": [
      {
        "size": "2 compartment",
        "dimension": "round",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 360,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Cornstarch Oracle Meal Tray with Lid",
    "slug": "cornstarch-oracle-meal-tray-with-lid",
    "urlPath": "/products/cornstarch-oracle-meal-tray-with-lid",
    "category": "takeaway-boxes",
    "categoryLabel": "Takeaway Boxes",
    "sourceSheetCategory": "Biodegradable Container - Cornstarch",
    "sizeCount": 4,
    "variants": [
      {
        "size": "3 compartment",
        "dimension": null,
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 450,
        "qtyPerPkt": 50
      },
      {
        "size": "4 compartment",
        "dimension": null,
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 210,
        "qtyPerPkt": 50
      },
      {
        "size": "5 compartment",
        "dimension": null,
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 300,
        "qtyPerPkt": 50
      },
      {
        "size": "8 compartment",
        "dimension": null,
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": 180,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  },
  {
    "productFamily": "Cornstarch Rectangular Container with Lid",
    "slug": "cornstarch-rectangular-container-with-lid",
    "urlPath": "/products/cornstarch-rectangular-container-with-lid",
    "category": "takeaway-boxes",
    "categoryLabel": "Takeaway Boxes",
    "sourceSheetCategory": "Biodegradable Container - Cornstarch",
    "sizeCount": 3,
    "variants": [
      {
        "size": "500 mL",
        "dimension": "rectangular",
        "capacityMl": 500,
        "capacityOz": 16.91,
        "qtyPerBox": 750,
        "qtyPerPkt": 50
      },
      {
        "size": "650 mL",
        "dimension": "rectangular",
        "capacityMl": 650,
        "capacityOz": 21.98,
        "qtyPerBox": 600,
        "qtyPerPkt": 50
      },
      {
        "size": "750 mL",
        "dimension": "rectangular",
        "capacityMl": 750,
        "capacityOz": 25.36,
        "qtyPerBox": 600,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Cornstarch Round Container with Lid",
    "slug": "cornstarch-round-container-with-lid",
    "urlPath": "/products/cornstarch-round-container-with-lid",
    "category": "takeaway-boxes",
    "categoryLabel": "Takeaway Boxes",
    "sourceSheetCategory": "Biodegradable Container - Cornstarch",
    "sizeCount": 4,
    "variants": [
      {
        "size": "350 mL",
        "dimension": "round",
        "capacityMl": 350,
        "capacityOz": 11.83,
        "qtyPerBox": 1000,
        "qtyPerPkt": 50
      },
      {
        "size": "450 mL",
        "dimension": "round",
        "capacityMl": 450,
        "capacityOz": 15.22,
        "qtyPerBox": 800,
        "qtyPerPkt": 50
      },
      {
        "size": "500 mL",
        "dimension": "round",
        "capacityMl": 500,
        "capacityOz": 16.91,
        "qtyPerBox": 600,
        "qtyPerPkt": 50
      },
      {
        "size": "650 mL",
        "dimension": "round",
        "capacityMl": 650,
        "capacityOz": 21.98,
        "qtyPerBox": 600,
        "qtyPerPkt": 50
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Kraft Boat Tray",
    "slug": "kraft-boat-tray",
    "urlPath": "/products/kraft-boat-tray",
    "category": "takeaway-boxes",
    "categoryLabel": "Takeaway Boxes",
    "sourceSheetCategory": "Boat Tray",
    "sizeCount": 3,
    "variants": [
      {
        "size": "500 mL",
        "dimension": "boat",
        "capacityMl": 500,
        "capacityOz": 16.91,
        "qtyPerBox": 500,
        "qtyPerPkt": null
      },
      {
        "size": "750 mL",
        "dimension": "boat",
        "capacityMl": 750,
        "capacityOz": 25.36,
        "qtyPerBox": 500,
        "qtyPerPkt": null
      },
      {
        "size": "1000 mL",
        "dimension": "boat",
        "capacityMl": 1000,
        "capacityOz": 33.81,
        "qtyPerBox": 500,
        "qtyPerPkt": null
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Plain Rectangular Food Box",
    "slug": "plain-rectangular-food-box",
    "urlPath": "/products/plain-rectangular-food-box",
    "category": "takeaway-boxes",
    "categoryLabel": "Takeaway Boxes",
    "sourceSheetCategory": "Food Box",
    "sizeCount": 3,
    "variants": [
      {
        "size": "500 mL",
        "dimension": "rectangular",
        "capacityMl": 500,
        "capacityOz": 16.91,
        "qtyPerBox": 500,
        "qtyPerPkt": null
      },
      {
        "size": "750 mL",
        "dimension": "rectangular",
        "capacityMl": 750,
        "capacityOz": 25.36,
        "qtyPerBox": 500,
        "qtyPerPkt": null
      },
      {
        "size": "1000 mL",
        "dimension": "rectangular",
        "capacityMl": 1000,
        "capacityOz": 33.81,
        "qtyPerBox": 500,
        "qtyPerPkt": null
      }
    ],
    "variantType": "capacity",
    "moqPieces": null
  },
  {
    "productFamily": "Top-Folding Pizza Box",
    "slug": "top-folding-pizza-box",
    "urlPath": "/products/top-folding-pizza-box",
    "category": "takeaway-boxes",
    "categoryLabel": "Takeaway Boxes",
    "sourceSheetCategory": "Paper Boxes",
    "sizeCount": 3,
    "variants": [
      {
        "size": "7 x 7 x 1.5 in",
        "dimension": "7 x 7 x 1.5 in",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 100
      },
      {
        "size": "8 x 8 x 1.5 in",
        "dimension": "8 x 8 x 1.5 in",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 100
      },
      {
        "size": "10 x 10 x 1.5 in",
        "dimension": "10 x 10 x 1.5 in",
        "capacityMl": null,
        "capacityOz": null,
        "qtyPerBox": null,
        "qtyPerPkt": 100
      }
    ],
    "variantType": "dimension",
    "moqPieces": null
  }
];

function getArtType(p) {
  const slug = p.slug;
  const cat = p.category;
  if (slug === 'double-wall-paper-cup' || slug === 'ripple-paper-cup') {
    return { type: 'cup' };
  }
  if (cat === 'cutlery-straws') {
    if (slug.includes('straw')) return { type: 'static', art: 'straw' };
    return { type: 'static', art: 'cutlery' };
  }
  if (cat === 'cups-lids') {
    if (slug.includes('cup')) return { type: 'cup' };
    return { type: 'static', art: 'bowl' };
  }
  if (cat === 'plates-bowls') {
    if (slug.includes('bowl')) return { type: 'static', art: 'bowl' };
    if (slug.includes('clamshell')) return { type: 'static', art: 'clam' };
    if (slug.includes('container')) return { type: 'static', art: 'clam' };
    return { type: 'static', art: 'plate' };
  }
  if (cat === 'takeaway-boxes') {
    if (slug.includes('bowl')) return { type: 'static', art: 'bowl' };
    if (slug.includes('container') || slug.includes('boat')) return { type: 'static', art: 'clam' };
    return { type: 'static', art: 'box' };
  }
  return { type: 'static', art: 'box' };
}

function getMaterial(p) {
  const name = p.productFamily.toLowerCase();
  if (name.includes('cornstarch')) return '[DRAFT — verify] Biodegradable cornstarch resin composite';
  if (name.includes('bamboo')) return '[DRAFT — verify] Natural bamboo fibre';
  if (name.includes('wooden') || name.includes('chopsticks') || name.includes('stirrer') || name.includes('toothpick') || name.includes('skewer')) return '[DRAFT — verify] Birchwood / natural timber';
  if (name.includes('chuk') || name.includes('ecolates')) return '[DRAFT — verify] 100% sugarcane bagasse pulp';
  if (name.includes('corrugated')) return '[DRAFT — verify] 3-ply corrugated kraft paperboard';
  if (name.includes('kraft')) return '[DRAFT — verify] Food-grade unbleached kraft paperboard';
  if (name.includes('paper')) return '[DRAFT — verify] Food-grade virgin paperboard with plant-based lining';
  return '[DRAFT — verify] Food-safe commercial packaging substrate';
}

function getPrinting(p) {
  const name = p.productFamily.toLowerCase();
  if (name.includes('bamboo') || name.includes('wooden') || name.includes('toothpick') || name.includes('skewer') || name.includes('stirrer') || name.includes('chopsticks')) {
    return 'Not printable — natural fibre finish only';
  }
  if (name.includes('chuk') || name.includes('ecolates')) {
    return 'Not printable — natural moulded fibre finish';
  }
  if (name.includes('pizza') || name.includes('box') || name.includes('cup') || name.includes('straw') || name.includes('boat')) {
    return '[DRAFT — verify] Custom printing available (1–4 colours)';
  }
  return '[DRAFT — verify] Custom branding or plain options available';
}

function getEndOfLife(p) {
  const name = p.productFamily.toLowerCase();
  if (name.includes('chuk') || name.includes('ecolates') || name.includes('bagasse')) return '[DRAFT — verify] 100% home and commercial compostable (EN 13432)';
  if (name.includes('cornstarch')) return '[DRAFT — verify] Commercially compostable & biodegradable';
  if (name.includes('bamboo') || name.includes('wooden')) return '[DRAFT — verify] 100% biodegradable and compostable';
  if (name.includes('paper') || name.includes('corrugated')) return '[DRAFT — verify] Recyclable & commercially compostable';
  return '[DRAFT — verify] Biodegradable / commercially compostable';
}

function getTagline(p) {
  return `[DRAFT — verify] Commercial grade ${p.productFamily.toLowerCase()} for food service & export.`;
}

function getSummary(p) {
  const sizeDesc = p.sizeCount > 1 ? `${p.sizeCount} size options` : 'single standardized spec';
  return `[DRAFT — verify] High-quality ${p.productFamily.toLowerCase()} designed for hospitality, catering, and food delivery. Available in ${sizeDesc} with bulk export packing.`;
}

const products = inputJson.map((p, idx) => {
  const sizes = p.variants.map((v) => ({
    label: v.capacityOz ? `${Math.round(v.capacityOz)} oz` : (v.dimension && !['not stated', 'round', 'rectangular', 'square', 'boat'].includes(v.dimension.toLowerCase()) ? v.dimension : v.size),
    note: v.capacityMl ? `${v.capacityMl} mL` : (v.dimension ?? ''),
  }));

  const sameCat = inputJson.filter(o => o.category === p.category && o.slug !== p.slug).map(o => o.slug);
  const relatedSlugs = sameCat.slice(0, 3);

  return {
    slug: p.slug,
    name: p.productFamily,
    categorySlug: p.category,
    categoryName: p.categoryLabel,
    sourceSheetCategory: p.sourceSheetCategory,
    variantType: p.variantType,
    variants: p.variants,
    moqPieces: null,
    baseMoq: 50000,
    moqUnit: 'pieces',
    tagline: getTagline(p),
    summary: getSummary(p),
    ratingLabel: '[DRAFT — verify] Commercial export grade',
    sizes: sizes,
    material: getMaterial(p),
    printing: getPrinting(p),
    endOfLife: getEndOfLife(p),
    leadTime: '2–3 weeks',
    shipsFrom: 'Nhava Sheva (Mumbai), India',
    isDraftCopy: true,
    gallery: getArtType(p),
    overview: [
      {
        heading: '[DRAFT — verify] Product Overview',
        body: `[DRAFT — verify] Engineered for food service reliability, temperature resistance, and clean presentation.`,
        bullets: [
          `[DRAFT — verify] Food-contact grade certified manufacturing`,
          `[DRAFT — verify] Sturdy build optimized for handling and transport`,
          `[DRAFT — verify] Reliable bulk carton packing for export distribution`,
        ],
      },
      {
        heading: '[DRAFT — verify] Export & Ordering',
        body: `[DRAFT — verify] Shipped directly from port with complete commercial documentation and quality inspection before dispatch.`,
        bullets: [
          `[DRAFT — verify] Consolidated container shipping available across product families`,
          `[DRAFT — verify] Pre-production samples available upon request`,
        ],
      },
    ],
    certifications: [
      { name: 'FDA food-contact', note: '[DRAFT — verify] Food safety compliance' },
      { name: 'ISO 9001', note: '[DRAFT — verify] Facility quality system' },
    ],
    faqs: [
      {
        question: `Can I order mixed carton quantities of ${p.productFamily}?`,
        answer: `[DRAFT — verify] Yes, mixed orders and container consolidation are supported across our catalogue. Contact our sales team with your required breakdown.`,
      },
      {
        question: `How are samples arranged?`,
        answer: `[DRAFT — verify] Physical samples can be dispatched for testing and approval prior to full production.`,
      },
    ],
    relatedSlugs: relatedSlugs,
  };
});

const code = `import type { Product } from "@/types";

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function findProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function resolveRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs.map(findProduct).filter((p): p is Product => Boolean(p));
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'products.ts'), code, 'utf8');
console.log(`Successfully generated ${products.length} products in src/data/products.ts`);
