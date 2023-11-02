import { MigrationInterface, QueryRunner } from "typeorm";

export class AllProductInCity1698939466595 implements MigrationInterface {
    name = 'AllProductInCity1698939466595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "cityId" integer`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "phones" SET DEFAULT '{+7 (999) 999-99-99,+7 (3412) 99 99 99}'`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_39ac5ec6c6bd5d162c64e4b3e43" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_39ac5ec6c6bd5d162c64e4b3e43"`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "phones" SET DEFAULT '{"+7 (999) 999-99-99","+7 (3412) 99 99 99"}'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "cityId"`);
    }

}
