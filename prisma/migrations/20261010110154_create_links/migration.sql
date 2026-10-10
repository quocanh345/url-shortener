-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(16) NOT NULL,
    "original_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_code_key" ON "links"("code");
