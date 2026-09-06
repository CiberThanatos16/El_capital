--
-- PostgreSQL database dump
--

\restrict jh6gkJUuTQwLA9wLqgjAfB2ejbAAWzDCydQxnPvg8yaAqqnLqJ2z845ZAGDpfUu

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
-- Name: gastos; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.gastos OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 33097)
-- Name: gastos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gastos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gastos_id_seq OWNER TO postgres;

--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 221
-- Name: gastos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gastos_id_seq OWNED BY public.gastos.id;


--
-- TOC entry 224 (class 1259 OID 33116)
-- Name: ingresos; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.ingresos OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 33175)
-- Name: historial; Type: VIEW; Schema: public; Owner: postgres
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


ALTER VIEW public.historial OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 33115)
-- Name: ingresos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingresos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ingresos_id_seq OWNER TO postgres;

--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 223
-- Name: ingresos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingresos_id_seq OWNED BY public.ingresos.id;


--
-- TOC entry 226 (class 1259 OID 33157)
-- Name: metas; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.metas OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 33156)
-- Name: metas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.metas_id_seq OWNER TO postgres;

--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 225
-- Name: metas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metas_id_seq OWNED BY public.metas.id;


--
-- TOC entry 220 (class 1259 OID 33082)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password_hash character varying(255),
    created_at timestamp without time zone DEFAULT now(),
    google_id character varying(255)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 33081)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4776 (class 2604 OID 33101)
-- Name: gastos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gastos ALTER COLUMN id SET DEFAULT nextval('public.gastos_id_seq'::regclass);


--
-- TOC entry 4778 (class 2604 OID 33119)
-- Name: ingresos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingresos ALTER COLUMN id SET DEFAULT nextval('public.ingresos_id_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 33160)
-- Name: metas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metas ALTER COLUMN id SET DEFAULT nextval('public.metas_id_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 33085)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4951 (class 0 OID 33098)
-- Dependencies: 222
-- Data for Name: gastos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gastos (id, cantidad, descripcion, categoria_id, usuario_id, created_at) FROM stdin;
1	1700.00	despensa	hogar	\N	2026-07-05 18:54:07.138777
2	99.66	sabritas familiares	comida	\N	2026-07-05 19:20:02.903933
3	23.00	Pizza	comida	\N	2026-07-13 09:39:10.38518
4	1000.00	despensa semanal	hogar	1	2026-07-15 08:19:31.312718
\.


--
-- TOC entry 4953 (class 0 OID 33116)
-- Dependencies: 224
-- Data for Name: ingresos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingresos (id, cantidad, descripcion, fuente, usuario_id, created_at) FROM stdin;
1	15000.00	Pagina para restaurante	freelance	\N	2026-07-04 10:22:02.578084
2	8000.00	Pagina de dentista	freelance	\N	2026-07-05 16:59:36.827532
3	2000.00	Nomina	nomina	\N	2026-07-05 18:01:00.657111
4	970.00	despensa	\N	\N	2026-07-05 18:10:58.098129
5	1270.00	despensa	\N	\N	2026-07-05 18:11:34.282145
6	2500.00	prestamo	prestamo	\N	2026-07-15 06:51:14.102694
7	2500.00	Semana	nomina	1	2026-07-15 08:18:57.83324
\.


--
-- TOC entry 4955 (class 0 OID 33157)
-- Dependencies: 226
-- Data for Name: metas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metas (id, tipo, nombre, categoria, monto_objetivo, fecha_inicio, fecha_limite, usuario_id, created_at) FROM stdin;
1	ahorro	bolillo	\N	25.00	2026-07-12	2026-07-24	\N	2026-07-12 22:15:17.500868
2	limite_gasto	refrescos	videojuegos	300.00	2026-07-12	\N	\N	2026-07-12 22:20:24.091024
\.


--
-- TOC entry 4949 (class 0 OID 33082)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, password_hash, created_at, google_id) FROM stdin;
1	Amon	amon@gmail.com	$2b$10$l5EqcS7oaoQS.g9WBJK.4ObJGJaaW6kRTTTKH1NrGG.eoT.TonWc.	2026-07-14 10:19:18.461684	\N
2	andres	andres@gmail.com	$2b$10$QAqVaibvHAYh66BNXtUiu.AWLOamsYQLrsifeotOoT/iJRn2AdRdK	2026-07-14 10:20:58.869491	\N
3	Metal Random	georochi@gmail.com	\N	2026-07-17 23:12:49.293211	100560285918649825570
\.


--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 221
-- Name: gastos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gastos_id_seq', 4, true);


--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 223
-- Name: ingresos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingresos_id_seq', 7, true);


--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 225
-- Name: metas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metas_id_seq', 2, true);


--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


--
-- TOC entry 4792 (class 2606 OID 33109)
-- Name: gastos gastos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gastos
    ADD CONSTRAINT gastos_pkey PRIMARY KEY (id);


--
-- TOC entry 4794 (class 2606 OID 33125)
-- Name: ingresos ingresos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingresos
    ADD CONSTRAINT ingresos_pkey PRIMARY KEY (id);


--
-- TOC entry 4796 (class 2606 OID 33169)
-- Name: metas metas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metas
    ADD CONSTRAINT metas_pkey PRIMARY KEY (id);


--
-- TOC entry 4786 (class 2606 OID 33096)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4788 (class 2606 OID 33180)
-- Name: usuarios usuarios_google_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_google_id_key UNIQUE (google_id);


--
-- TOC entry 4790 (class 2606 OID 33094)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4797 (class 2606 OID 33110)
-- Name: gastos gastos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gastos
    ADD CONSTRAINT gastos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4798 (class 2606 OID 33126)
-- Name: ingresos ingresos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingresos
    ADD CONSTRAINT ingresos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4799 (class 2606 OID 33170)
-- Name: metas metas_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metas
    ADD CONSTRAINT metas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


-- Completed on 2026-07-22 09:58:53

--
-- PostgreSQL database dump complete
--

\unrestrict jh6gkJUuTQwLA9wLqgjAfB2ejbAAWzDCydQxnPvg8yaAqqnLqJ2z845ZAGDpfUu

