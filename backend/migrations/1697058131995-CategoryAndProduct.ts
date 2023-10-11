import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryAndProduct1697058131995 implements MigrationInterface {
    name = 'CategoryAndProduct1697058131995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "published" boolean NOT NULL DEFAULT true, "slug" character varying NOT NULL, "slugRu" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "price" integer NOT NULL, "image" character varying NOT NULL DEFAULT '', "description" character varying NOT NULL, "weight" integer NOT NULL, "slug" character varying NOT NULL, "slugRu" character varying NOT NULL, "startAvailableTime" TIMESTAMP NOT NULL DEFAULT now(), "endAvailableTime" TIMESTAMP NOT NULL DEFAULT now(), "published" boolean NOT NULL DEFAULT true, "categoryId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
