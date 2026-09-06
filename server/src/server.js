import "dotenv/config";

import express from "express";

import cors from "cors";

import { PrismaClient } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL
      ? process.env.CLIENT_URL
          .split(",")
          .map((url) => url.trim())
      : true
  })
);

app.use(express.json());


// ----------------------------------------
// HEALTH CHECK
// ----------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "1Fi EMI API is running",
    timestamp: new Date().toISOString()
  });
});


// ----------------------------------------
// GET ALL PRODUCTS
// ----------------------------------------

app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: {
          include: {
            emiPlans: {
              where: {
                isActive: true
              },

              orderBy: {
                tenureMonths: "asc"
              }
            }
          },

          orderBy: {
            price: "asc"
          }
        }
      },

      orderBy: {
        createdAt: "asc"
      }
    });

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
});


// ----------------------------------------
// GET SINGLE PRODUCT
// ----------------------------------------

app.get("/api/products/:slug", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: req.params.slug
      },

      include: {
        variants: {
          include: {
            emiPlans: {
              where: {
                isActive: true
              },

              orderBy: {
                tenureMonths: "asc"
              }
            }
          },

          orderBy: {
            price: "asc"
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product"
    });
  }
});


// ----------------------------------------
// GET EMI PLANS
// ----------------------------------------

app.get(
  "/api/products/:slug/variants/:variantId/plans",
  async (req, res) => {
    try {
      const variant = await prisma.variant.findFirst({
        where: {
          id: req.params.variantId,

          product: {
            slug: req.params.slug
          }
        },

        include: {
          emiPlans: {
            where: {
              isActive: true
            },

            orderBy: {
              tenureMonths: "asc"
            }
          }
        }
      });

      if (!variant) {
        return res.status(404).json({
          success: false,
          message: "Variant not found"
        });
      }

      res.json({
        success: true,
        data: variant.emiPlans
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch EMI plans"
      });
    }
  }
);


// ----------------------------------------
// 404
// ----------------------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});


// ----------------------------------------
// START SERVER
// ----------------------------------------

app.listen(PORT, () => {
  console.log(
    `1Fi backend running at http://localhost:${PORT}`
  );
});


// ----------------------------------------
// SHUTDOWN
// ----------------------------------------

process.on("SIGINT", async () => {
  await prisma.$disconnect();

  process.exit(0);
});
