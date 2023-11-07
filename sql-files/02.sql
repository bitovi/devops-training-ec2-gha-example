\c postgres;

create schema tenancy;

create table
    tenancy.org (
        id uuid primary key,
        org_mnemonic text,
        org_type text,
        zendesk_url text,
        org_name text,
        account_type text,
        notes text,
        is_active boolean,
        created_date timestamptz default current_timestamp
    );

create table
    tenancy.mfr_org (id uuid primary key, org_id uuid);

create table
    tenancy.payer_org (id uuid primary key, org_id uuid);

create table
    tenancy.org_contains (
        id uuid primary key,
        parent_org_id uuid,
        child_org_id uuid
    );

create table
    tenancy.user (id uuid primary key, org_id uuid);

create table
    tenancy.product_contract (
        id uuid primary key,
        mfr_org_id uuid,
        contract_mnemonic text,
        schema_name text
    );

create table
    tenancy.product_contract_state_machine (
        id uuid primary key,
        contract_id uuid,
        state_machine_json text
    );

create table
    tenancy.org_contract (
        id uuid primary key,
        org_id uuid,
        contract_id uuid
    );

create table
    tenancy.user_contract (
        id uuid primary key,
        user_id uuid,
        contract_id uuid
    );

create table
    tenancy.data_source (
        id uuid primary key,
        data_source_mnemonic text,
        org_id uuid
    );

create table
    tenancy.data_channel (
        id uuid primary key,
        data_source_id uuid,
        contract_id uuid
    );

create table
    tenancy.document_library (
        id uuid primary key,
        file_name text,
        document_title text,
        folder_name text,
        payer_org_id uuid,
        contract_id uuid,
        bucket_name text,
        bucket_key text,
        upload_date timestamptz,
        status_date timestamptz,
        document_status text
    );

create table
    tenancy.zendesk_therapy_product (
        id uuid primary key,
        contract_id uuid,
        zendesk_id text
    );

create table
    tenancy.zendesk_task_entity (
        id uuid primary key,
        org_id uuid,
        zendesk_id text
    );