-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registerNo" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "approvedBy" TEXT NOT NULL,
    "submit" BOOLEAN NOT NULL,
    "returned" BOOLEAN NOT NULL,
    "comeoutTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comeinTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_registerNo_key" ON "Student"("registerNo");
