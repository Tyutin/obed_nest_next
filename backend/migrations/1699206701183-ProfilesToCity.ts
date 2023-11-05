import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfilesToCity1699206701183 implements MigrationInterface {
    name = 'ProfilesToCity1699206701183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "vkId" integer NOT NULL, "firstName" character varying NOT NULL DEFAULT '', "lastName" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "phone" character varying NOT NULL DEFAULT '', "buildingAdress" character varying NOT NULL DEFAULT '', "entranceNumber" integer, "apartmentNumber" integer, "floorNumber" integer, "commentForDelivery" character varying NOT NULL DEFAULT '', "points" integer NOT NULL DEFAULT '0', "cityId" integer, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "phones" SET DEFAULT '{+7 (999) 999-99-99,+7 (3412) 99 99 99}'`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_350e025f4336b40a3c876ee9e33" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_350e025f4336b40a3c876ee9e33"`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "phones" SET DEFAULT '{"+7 (999) 999-99-99","+7 (3412) 99 99 99"}'`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
