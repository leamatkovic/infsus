-- CreateTable
CREATE TABLE "karta" (
    "idkarta" SERIAL NOT NULL,
    "popust" DOUBLE PRECISION,
    "razred" INTEGER NOT NULL,
    "idvoznja" INTEGER NOT NULL,
    "idputnik" INTEGER NOT NULL,

    CONSTRAINT "karta_pkey" PRIMARY KEY ("idkarta")
);

-- CreateTable
CREATE TABLE "linija" (
    "brojlinije" SERIAL NOT NULL,
    "odredisteidstanica" INTEGER NOT NULL,
    "polazisteidstanica" INTEGER NOT NULL,

    CONSTRAINT "linija_pkey" PRIMARY KEY ("brojlinije")
);

-- CreateTable
CREATE TABLE "opcijapristupacnosti" (
    "idopcijapristupacnosti" SERIAL NOT NULL,
    "naziv" VARCHAR(100) NOT NULL,

    CONSTRAINT "opcijapristupacnosti_pkey" PRIMARY KEY ("idopcijapristupacnosti")
);

-- CreateTable
CREATE TABLE "pristupacnoststanice" (
    "idopcijapristupacnosti" INTEGER NOT NULL,
    "idstanica" INTEGER NOT NULL,

    CONSTRAINT "pristupacnoststanice_pkey" PRIMARY KEY ("idopcijapristupacnosti","idstanica")
);

-- CreateTable
CREATE TABLE "pristupacnostvlaka" (
    "idopcijapristupacnosti" INTEGER NOT NULL,
    "idvlak" INTEGER NOT NULL,

    CONSTRAINT "pristupacnostvlaka_pkey" PRIMARY KEY ("idopcijapristupacnosti","idvlak")
);

-- CreateTable
CREATE TABLE "putnik" (
    "ime" VARCHAR(100) NOT NULL,
    "prezime" VARCHAR(100) NOT NULL,
    "pomagalo" VARCHAR(100),
    "idputnik" SERIAL NOT NULL,

    CONSTRAINT "putnik_pkey" PRIMARY KEY ("idputnik")
);

-- CreateTable
CREATE TABLE "stanica" (
    "imestanice" VARCHAR(100) NOT NULL,
    "idstanica" SERIAL NOT NULL,

    CONSTRAINT "stanica_pkey" PRIMARY KEY ("idstanica")
);

-- CreateTable
CREATE TABLE "vlak" (
    "idvlak" SERIAL NOT NULL,
    "brojmjesta" INTEGER NOT NULL,

    CONSTRAINT "vlak_pkey" PRIMARY KEY ("idvlak")
);

-- CreateTable
CREATE TABLE "voznja" (
    "vrijemepolazak" DATE NOT NULL,
    "vrijemedolazak" DATE NOT NULL,
    "idvoznja" SERIAL NOT NULL,
    "cijenakarte" DOUBLE PRECISION NOT NULL,
    "idvlak" INTEGER NOT NULL,
    "brojlinije" INTEGER NOT NULL,

    CONSTRAINT "voznja_pkey" PRIMARY KEY ("idvoznja")
);

-- AddForeignKey
ALTER TABLE "karta" ADD CONSTRAINT "karta_idputnik_fkey" FOREIGN KEY ("idputnik") REFERENCES "putnik"("idputnik") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "karta" ADD CONSTRAINT "karta_idvoznja_fkey" FOREIGN KEY ("idvoznja") REFERENCES "voznja"("idvoznja") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "linija" ADD CONSTRAINT "linija_odredisteidstanica_fkey" FOREIGN KEY ("odredisteidstanica") REFERENCES "stanica"("idstanica") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "linija" ADD CONSTRAINT "linija_polazisteidstanica_fkey" FOREIGN KEY ("polazisteidstanica") REFERENCES "stanica"("idstanica") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pristupacnoststanice" ADD CONSTRAINT "pristupacnoststanice_idopcijapristupacnosti_fkey" FOREIGN KEY ("idopcijapristupacnosti") REFERENCES "opcijapristupacnosti"("idopcijapristupacnosti") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pristupacnoststanice" ADD CONSTRAINT "pristupacnoststanice_idstanica_fkey" FOREIGN KEY ("idstanica") REFERENCES "stanica"("idstanica") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pristupacnostvlaka" ADD CONSTRAINT "pristupacnostvlaka_idopcijapristupacnosti_fkey" FOREIGN KEY ("idopcijapristupacnosti") REFERENCES "opcijapristupacnosti"("idopcijapristupacnosti") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pristupacnostvlaka" ADD CONSTRAINT "pristupacnostvlaka_idvlak_fkey" FOREIGN KEY ("idvlak") REFERENCES "vlak"("idvlak") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "voznja" ADD CONSTRAINT "voznja_brojlinije_fkey" FOREIGN KEY ("brojlinije") REFERENCES "linija"("brojlinije") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "voznja" ADD CONSTRAINT "voznja_idvlak_fkey" FOREIGN KEY ("idvlak") REFERENCES "vlak"("idvlak") ON DELETE NO ACTION ON UPDATE NO ACTION;

