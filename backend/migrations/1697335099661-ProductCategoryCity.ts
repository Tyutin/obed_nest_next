import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCategoryCity1697335099661 implements MigrationInterface {
    name = 'ProductCategoryCity1697335099661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "price" integer NOT NULL, "image" character varying NOT NULL DEFAULT '', "description" character varying NOT NULL, "weight" integer NOT NULL, "slugEn" character varying NOT NULL, "slugRu" character varying NOT NULL, "startAvailableTime" TIMESTAMP NOT NULL DEFAULT now(), "endAvailableTime" TIMESTAMP NOT NULL DEFAULT now(), "published" boolean NOT NULL DEFAULT true, "categoryId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL DEFAULT 'Город', "published" boolean NOT NULL DEFAULT true, "slugEn" character varying NOT NULL DEFAULT 'gorod', "slugRu" character varying NOT NULL DEFAULT 'город', "cityId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "nextPayment" TIMESTAMP NOT NULL DEFAULT now(), "isWorking" boolean NOT NULL DEFAULT true, "city" character varying NOT NULL, "slugRu" character varying NOT NULL, "slugEn" character varying NOT NULL, "companyName" character varying NOT NULL DEFAULT 'Доставка', "phones" text NOT NULL DEFAULT '["+7 (999) 999-99-99","+7 (3412) 99 99 99"]', "email" character varying NOT NULL DEFAULT 'email@example.com', "vkLink" character varying NOT NULL DEFAULT 'https://vk.com', "telegramLink" character varying NOT NULL DEFAULT 'https://t.me', "instagramLink" character varying NOT NULL DEFAULT 'https://www.instagram.com/', "legalInfo" character varying NOT NULL DEFAULT 'Юридическая информация (контакты, ответственные...)', "minimumOrderFrom" integer NOT NULL DEFAULT '0', "newDayStartTime" integer NOT NULL DEFAULT '14', "workHours" jsonb DEFAULT '{"monday":{"isWorking":true,"startShippingTime":"09:00","endShippingTime":"15:00"},"tuesday":{"isWorking":true,"startShippingTime":"09:00","endShippingTime":"15:00"},"wednesday":{"isWorking":true,"startShippingTime":"09:00","endShippingTime":"15:00"},"thursday":{"isWorking":true,"startShippingTime":"09:00","endShippingTime":"15:00"},"friday":{"isWorking":true,"startShippingTime":"09:00","endShippingTime":"15:00"},"saturday":{"isWorking":false,"startShippingTime":"09:00","endShippingTime":"15:00"},"sunday":{"isWorking":false,"startShippingTime":"09:00","endShippingTime":"15:00"}}', "deliveryZones" jsonb DEFAULT '[{"name":"Зона 1 (зеленая)","conditions":[{"cartCostFrom":150,"shippingCost":100},{"cartCostFrom":500,"shippingCost":0}]},{"name":"Зона 2 (синяя)","conditions":[{"cartCostFrom":150,"shippingCost":100},{"cartCostFrom":600,"shippingCost":0}]}]', "shippingZoneMapLink" character varying NOT NULL DEFAULT 'https://yandex.ru/map-constructor', CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_60e749054a47d428504305ad5b9" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_60e749054a47d428504305ad5b9"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
