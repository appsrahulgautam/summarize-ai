-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	"user_id" uuid,
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255) CONSTRAINT "payments_subscription_unique" UNIQUE,
	"stripe_payment_intent_id" varchar(255),
	"stripe_invoice_id" varchar(255),
	"plan" varchar(50),
	"amount" integer,
	"currency" varchar(10),
	"payment_status" varchar(50),
	"subscription_status" varchar(50),
	"period_start" timestamp with time zone,
	"period_end" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "pdf_summaries" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	"user_id" varchar(255) NOT NULL,
	"original_file_url" text NOT NULL,
	"summary_text" text NOT NULL,
	"status" varchar(50) DEFAULT 'completed',
	"title" text,
	"file_name" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	"email" varchar(255) NOT NULL CONSTRAINT "users_email_key" UNIQUE,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"full_name" varchar(255),
	"customer_id" varchar(255) CONSTRAINT "users_customer_id_key" UNIQUE,
	"plan" varchar(255),
	"status" varchar(50) DEFAULT 'inactive',
	"auth_user_id" varchar(255) CONSTRAINT "users_auth_user_id_key" UNIQUE
);


-- todo whats happening is that we are saying before updating any table for any row, 
-- todo simpply update its updated_at row with the now time stamp. Or else if 
-- todo its not there then we would have to update every updated_at column of every table row manually 

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdf_summaries_updated_at
    BEFORE UPDATE ON pdf_summaries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdf_summaries_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
