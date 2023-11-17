import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOauthEntities1700159336758 implements MigrationInterface {
    name = 'CreateOauthEntities1700159336758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UserEntity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "email" character varying, "emailVerified" character varying, "image" character varying, "role" character varying, CONSTRAINT "UQ_47447f6c9e7eeb86726a4f7cf14" UNIQUE ("email"), CONSTRAINT "PK_f28c02cf76148cdc220d5c056ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "AccountEntity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "type" character varying NOT NULL, "provider" character varying NOT NULL, "providerAccountId" character varying NOT NULL, "refresh_token" character varying, "access_token" character varying, "expires_at" bigint, "token_type" character varying, "scope" character varying, "id_token" character varying, "session_state" character varying, "oauth_token_secret" character varying, "oauth_token" character varying, CONSTRAINT "PK_80dc073a8d3fe534c30fc365ca2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "SessionEntity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sessionToken" character varying NOT NULL, "userId" uuid NOT NULL, "expires" character varying NOT NULL, CONSTRAINT "UQ_18a1936aee1ff28a5921cf8bb58" UNIQUE ("sessionToken"), CONSTRAINT "PK_10c4a91b3186a471489e8f35e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "VerificationTokenEntity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "identifier" character varying NOT NULL, "expires" character varying NOT NULL, CONSTRAINT "PK_c6c308ae772917f22bf0e313413" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "phones" SET DEFAULT '{+7 (999) 999-99-99,+7 (3412) 99 99 99}'`);
        await queryRunner.query(`ALTER TABLE "AccountEntity" ADD CONSTRAINT "FK_44d23b13b83617d364b5c47a138" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SessionEntity" ADD CONSTRAINT "FK_ae74ab34546d451ccd39980afc3" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SessionEntity" DROP CONSTRAINT "FK_ae74ab34546d451ccd39980afc3"`);
        await queryRunner.query(`ALTER TABLE "AccountEntity" DROP CONSTRAINT "FK_44d23b13b83617d364b5c47a138"`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "phones" SET DEFAULT '{"+7 (999) 999-99-99","+7 (3412) 99 99 99"}'`);
        await queryRunner.query(`DROP TABLE "VerificationTokenEntity"`);
        await queryRunner.query(`DROP TABLE "SessionEntity"`);
        await queryRunner.query(`DROP TABLE "AccountEntity"`);
        await queryRunner.query(`DROP TABLE "UserEntity"`);
    }

}
