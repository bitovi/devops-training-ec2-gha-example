\c postgres;

create schema data_exchange;

create table
    data_exchange.event (
        id uuid primary key,
        source text, -- aws:s3, ccd_request, polling_timer
        data_source_id uuid,
        type text, -- put_object, 
        status text, -- completed, open
        event_date_time timestamptz,
        completed_date_time timestamptz -- date requested ccd received
    );

create table
    data_exchange.item (
        id uuid primary key,
        event_id uuid,
        type text, -- file, document, message
        input_location text, --bucket name
        input_name text, --object key
        archive_bucket text,
        archive_key text
    );

create table
    data_exchange.step (
        id uuid primary key,
        item_id uuid not null,
        step_name text,
        start_date_time timestamptz,
        end_date_time timestamptz,
        step_result text,
        exit_status numeric
    );

create table
    data_exchange.metric (
        id uuid primary key,
        item_id uuid not null,
        metric_date_time timestamptz,
        metric_category text,
        metric_name text,
        numeric_value numeric,
        units text
    );

create table
    data_exchange.destination (
        id uuid primary key,
        item_id uuid not null,
        data_channel_id uuid not null,
        delivery_date_time timestamptz
    );

create table
    data_exchange.notification (
        id uuid primary key,
        event_id uuid, -- Notifification might relate to
        item_id uuid, -- event, item, oe step, so only
        step_id uuid, -- one of these has a value.
        issued_date_time timestamptz,
        medium text, -- sms, email, slack
        endpoint text, -- x@y.com, @aschriever
        message text -- error_message
    );