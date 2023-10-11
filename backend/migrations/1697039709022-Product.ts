import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1697039709022 implements MigrationInterface {
    name = 'Product1697039709022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "price" integer NOT NULL, "image" character varying NOT NULL DEFAULT '', "description" character varying NOT NULL, "weight" integer NOT NULL, "slug" character varying NOT NULL, "slugRu" character varying NOT NULL, "startAvailableTime" TIMESTAMP NOT NULL DEFAULT now(), "endAvailableTime" TIMESTAMP NOT NULL DEFAULT now(), "published" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
