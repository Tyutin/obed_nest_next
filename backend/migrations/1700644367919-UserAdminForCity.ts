import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAdminForCity1700644367919 implements MigrationInterface {
    name = 'UserAdminForCity1700644367919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity_admin_for_cities_city" ("userEntityId" uuid NOT NULL, "cityId" integer NOT NULL, CONSTRAINT "PK_b89208808635228e5b54312a4c5" PRIMARY KEY ("userEntityId", "cityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d328036c5384391b88d1dab970" ON "user_entity_admin_for_cities_city" ("userEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ee87dc118fa7fa9a949fd2bd3a" ON "user_entity_admin_for_cities_city" ("cityId") `);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "phones" SET DEFAULT '{+7 (999) 999-99-99,+7 (3412) 99 99 99}'`);
        await queryRunner.query(`ALTER TABLE "user_entity_admin_for_cities_city" ADD CONSTRAINT "FK_d328036c5384391b88d1dab9704" FOREIGN KEY ("userEntityId") REFERENCES "UserEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_entity_admin_for_cities_city" ADD CONSTRAINT "FK_ee87dc118fa7fa9a949fd2bd3a8" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity_admin_for_cities_city" DROP CONSTRAINT "FK_ee87dc118fa7fa9a949fd2bd3a8"`);
        await queryRunner.query(`ALTER TABLE "user_entity_admin_for_cities_city" DROP CONSTRAINT "FK_d328036c5384391b88d1dab9704"`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "phones" SET DEFAULT '{"+7 (999) 999-99-99","+7 (3412) 99 99 99"}'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee87dc118fa7fa9a949fd2bd3a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d328036c5384391b88d1dab970"`);
        await queryRunner.query(`DROP TABLE "user_entity_admin_for_cities_city"`);
    }

}
