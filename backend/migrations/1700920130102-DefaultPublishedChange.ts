import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultPublishedChange1700920130102 implements MigrationInterface {
    name = 'DefaultPublishedChange1700920130102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "published" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "published" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "phones" SET DEFAULT '{+7 (999) 999-99-99,+7 (3412) 99 99 99}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "phones" SET DEFAULT '{"+7 (999) 999-99-99","+7 (3412) 99 99 99"}'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "published" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "published" SET DEFAULT true`);
    }

}
