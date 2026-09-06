import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const calculateEmi = (principal, rate, months) => {
  if (rate === 0) {
    return Math.round(principal / months);
  }

  const monthlyRate = rate / 1200;

  return Math.round(
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );
};

const createEmiPlans = (price) => {
  const plans = [
    {
      months: 3,
      interest: 0,
      cashback: 750
    },
    {
      months: 6,
      interest: 0,
      cashback: 750
    },
    {
      months: 12,
      interest: 0,
      cashback: 750
    },
    {
      months: 24,
      interest: 0,
      cashback: 750
    },
    {
      months: 36,
      interest: 10.5,
      cashback: 750
    },
    {
      months: 48,
      interest: 10.5,
      cashback: 750
    },
    {
      months: 60,
      interest: 10.5,
      cashback: 750
    }
  ];

  return plans.map((plan) => ({
    monthlyPayment: calculateEmi(
      price,
      plan.interest,
      plan.months
    ),

    tenureMonths: plan.months,

    interestRate: plan.interest,

    cashback: plan.cashback
  }));
};

const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",

    description:
      "Premium smartphone with powerful performance, an advanced camera system and a beautiful display.",

    variants: [
      {
        name: "256GB Silver",
        storage: "256GB",
        color: "Silver",
        price: 127400,
        mrp: 134900,
        imageUrl:
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=85"
      },

      {
        name: "512GB Deep Blue",
        storage: "512GB",
        color: "Deep Blue",
        price: 147400,
        mrp: 154900,
        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85"
      }
    ]
  },

  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",

    description:
      "Flagship Android smartphone featuring a premium display, powerful performance and advanced cameras.",

    variants: [
      {
        name: "256GB Titanium Gray",
        storage: "256GB",
        color: "Titanium Gray",
        price: 109999,
        mrp: 129999,
        imageUrl:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=85"
      },

      {
        name: "512GB Titanium Black",
        storage: "512GB",
        color: "Titanium Black",
        price: 119999,
        mrp: 139999,
        imageUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85"
      }
    ]
  },

  {
    name: "Google Pixel 9 Pro",
    slug: "google-pixel-9-pro",
    brand: "Google",

    description:
      "AI-powered Pixel smartphone with an excellent camera experience and clean Android software.",

    variants: [
      {
        name: "256GB Obsidian",
        storage: "256GB",
        color: "Obsidian",
        price: 99999,
        mrp: 109999,
        imageUrl:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85"
      },

      {
        name: "512GB Porcelain",
        storage: "512GB",
        color: "Porcelain",
        price: 109999,
        mrp: 119999,
        imageUrl:
          "https://images.unsplash.com/photo-1592286927505-2fdc2f8a9a5d?auto=format&fit=crop&w=900&q=85"
      }
    ]
  }
];

async function main() {
  console.log("Clearing existing database...");

  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  console.log("Creating products...");

  for (const productData of products) {
    const product = await prisma.product.create({
      data: {
        name: productData.name,

        slug: productData.slug,

        brand: productData.brand,

        description: productData.description,

        variants: {
          create: productData.variants.map((variant) => ({
            name: variant.name,

            storage: variant.storage,

            color: variant.color,

            price: variant.price,

            mrp: variant.mrp,

            imageUrl: variant.imageUrl,

            emiPlans: {
              create: createEmiPlans(variant.price)
            }
          }))
        }
      }
    });

    console.log(`Created: ${product.name}`);
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

