--
-- neondb_ownerQL database dump
--

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2026-07-22 09:58:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 33098)
-- Name: gastos; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.gastos (
    id integer NOT NULL,
    cantidad numeric(12,2) NOT NULL,
    descripcion character varying(255),
    categoria_id character varying(255),
    usuario_id integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT gastos_cantidad_check CHECK ((cantidad > (0)::numeric))
);


ALTER TABLE public.gastos OWNER TO neondb_owner;

--
-- TOC entry 221 (class 1259 OID 33097)
-- Name: gastos_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.gastos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gastos_id_seq OWNER TO neondb_owner;

--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 221
-- Name: gastos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.gastos_id_seq OWNED BY public.gastos.id;


--
-- TOC entry 224 (class 1259 OID 33116)
-- Name: ingresos; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.ingresos (
    id integer NOT NULL,
    cantidad numeric(12,2) NOT NULL,
    descripcion character varying(255),
    fuente character varying(100),
    usuario_id integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT ingresos_cantidad_check CHECK ((cantidad > (0)::numeric))
);


ALTER TABLE public.ingresos OWNER TO neondb_owner;

--
-- TOC entry 227 (class 1259 OID 33175)
-- Name: historial; Type: VIEW; Schema: public; Owner: neondb_owner
--

CREATE VIEW public.historial AS
 SELECT ingresos.id,
    'ingreso'::text AS tipo,
    ingresos.fuente AS categoria,
    ingresos.cantidad,
    ingresos.usuario_id,
    ingresos.created_at
   FROM public.ingresos
UNION ALL
 SELECT gastos.id,
    'gasto'::text AS tipo,
    gastos.categoria_id AS categoria,
    gastos.cantidad,
    gastos.usuario_id,
    gastos.created_at
   FROM public.gastos
  ORDER BY 6 DESC;


ALTER VIEW public.historial OWNER TO neondb_owner;

--
-- TOC entry 223 (class 1259 OID 33115)
-- Name: ingresos_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.ingresos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ingresos_id_seq OWNER TO neondb_owner;

--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 223
-- Name: ingresos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.ingresos_id_seq OWNED BY public.ingresos.id;


--
-- TOC entry 226 (class 1259 OID 33157)
-- Name: metas; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.metas (
    id integer NOT NULL,
    tipo character varying(20) NOT NULL,
    nombre character varying(100) NOT NULL,
    categoria character varying(50),
    monto_objetivo numeric(10,2) NOT NULL,
    fecha_inicio date DEFAULT CURRENT_DATE NOT NULL,
    fecha_limite date,
    usuario_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.metas OWNER TO neondb_owner;

--
-- TOC entry 225 (class 1259 OID 33156)
-- Name: metas_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.metas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.metas_id_seq OWNER TO neondb_owner;

--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 225
-- Name: metas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.metas_id_seq OWNED BY public.metas.id;


--
-- TOC entry 220 (class 1259 OID 33082)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password_hash character varying(255),
    created_at timestamp without time zone DEFAULT now(),
    google_id character varying(255)
);


ALTER TABLE public.usuarios OWNER TO neondb_owner;

--
-- TOC entry 219 (class 1259 OID 33081)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO neondb_owner;


ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


ALTER TABLE ONLY public.gastos ALTER COLUMN id SET DEFAULT nextval('public.gastos_id_seq'::regclass);


ALTER TABLE ONLY public.ingresos ALTER COLUMN id SET DEFAULT nextval('public.ingresos_id_seq'::regclass);


ALTER TABLE ONLY public.metas ALTER COLUMN id SET DEFAULT nextval('public.metas_id_seq'::regclass);


ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


SELECT pg_catalog.setval('public.gastos_id_seq', 4, true);


SELECT pg_catalog.setval('public.ingresos_id_seq', 7, true);


SELECT pg_catalog.setval('public.metas_id_seq', 2, true);


SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


ALTER TABLE ONLY public.gastos
    ADD CONSTRAINT gastos_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.ingresos
    ADD CONSTRAINT ingresos_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.metas
    ADD CONSTRAINT metas_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_google_id_key UNIQUE (google_id);


ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.gastos
    ADD CONSTRAINT gastos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.ingresos
    ADD CONSTRAINT ingresos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


ALTER TABLE ONLY public.metas
    ADD CONSTRAINT metas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;
