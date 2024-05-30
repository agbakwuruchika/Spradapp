
'use client'
import React from 'react'
import Image from 'next/image'
import { db } from '../../../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react'
import { z, ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ClipLoader from "react-spinners/ClipLoader"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ButtonWithOutIcon from "@/components/button-without-icon"
import ButtonWithIcon from '@/components/button-with-icon';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"


  const listOfFederalUniversities = [
    {
      value: "abubakar-tafawa-balewa-university",
      label: "Abubakar Tafawa Balewa University (ATBU)",
      acronym: "atbu",
      location: "bauchi",
      state: "bauchi"
    },
    {
      value: "african-aviation-and-aerospace-university",
      label: "African Aviation And Aerospace University (AAAU)",
      acronym: "aaau",
      location: "fct",
      state: "abuja"
    },
    {
      value: "ahmadu-bello-university",
      label: "Ahmadu Bello University (ABU)",
      acronym: "abu",
      location: "zaria",
      state: "kaduna"
    },
    {
      value: "alex-ekwueme-federal-university",
      label: "Alex Ekwueme Federal University (AE-FUNAI)",
      acronym: "ae-funai",
      location: "ndufu-alike",
      state: "ebonyi"
    },
    {
      value: "bayero-university-kano",
      label: "Bayero University Kano (BUK)",
      acronym: "buk",
      location: "kano",
      state: "kano"
    },
    {
      value: "federal-university-of-transportation",
      label: "Federal University of Transportation (FUTD)",
      acronym: "futd",
      location: "daura",
      state: "katsina"
    },
    {
      value: "federal-university-birnin-kebbi",
      label: "Federal University Birnin-Kebbi (FUBK)",
      acronym: "fubk",
      location: "birnin-kebbi",
      state: "kebbi"
    },
    {
      value: "federal-university-dutse",
      label: "Federal University Dutse (FUD)",
      acronym: "fud",
      location: "dutse",
      state: "jigawa"
    },
    {
      value: "federal-university-dutsin-ma",
      label: "Federal University Dutsin-Ma (FUDMA)",
      acronym: "fudma",
      location: "dutsin-ma",
      state: "katsina"
    },
    {
      value: "federal-university-gashua",
      label: "Federal University Gashua (FUGASHUA)",
      acronym: "fugashua",
      location: "gashua",
      state: "yobe"
    },
    {
      value: "federal-university-gusau",
      label: "Federal University Guasau (FUGUS)",
      acronym: "fugus",
      location: "gusau",
      state: "zamfara"
    },
    {
      value: "federal-university-kashere",
      label: "Federal University Kashere (FUKASHERE)",
      acronym: "fukashere",
      location: "kashere",
      state: "gombe"
    },
    {
      value: "federal-university-of-lafia",
      label: "Federal University of Lafia (FULAFIA)",
      acronym: "fulafia",
      location: "lafia",
      state: "nasarawa"
    },
    {
      value: "federal-university-lokoja",
      label: "Federal University Lokoja (FULOKOJA)",
      acronym: "fulokoja",
      location: "lokoja",
      state: "kogi"
    },
    {
      value: "federal-university-otuoke",
      label: "Federal University Otuoke (FUOTUOKE)",
      acronym: "fuotuoke",
      location: "otuoke",
      state: "bayelsa"
    },
    {
      value: "federal-university-oye-ekiti",
      label: "Federal University Oye-Ekiti (FUOYE)",
      acronym: "fuoye",
      location: "oye-ekiti",
      state: "ekiti"
    },
    {
      value: "federal-university-wukari",
      label: "Federal University Wukari (FUWUKARI)",
      acronym: "fuwukari",
      location: "wukari",
      state: "taraba"
    },
    {
      value: "joseph-sarwuan-tarka-university",
      label: "Joseph Sarwuan Tarka University Makurdi (JSTUM)",
      acronym: "jstum",
      location: "makurdi",
      state: "benue"
    },
    {
      value: "modibbo-adama-university",
      label: "Modibbo Adama University Yola (MAUTECH)",
      acronym: "mautech",
      location: "yola",
      state: "adamawa"
    },
    {
      value: "nigerian-army-university",
      label: "Nigerian Army University Biu (NAUB)",
      acronym: "naub",
      location: "biu",
      state: "borno"
    },
    {
      value: "nigerian-defence-academy",
      label: "Nigerian Defence Academy Kaduna (NDA)",
      acronym: "nda",
      location: "kaduna",
      state: "kaduna"
    },
    {
      value: "nigerian-police-academy",
      label: "Nigerian Police Academy Wudil (POLAC)",
      acronym: "polac",
      location: "wudil",
      state: "kano"
    },
    {
      value: "nnamdi-azikiwe-university",
      label: "Nnamdi Azikiwe University Awka (UNIZIK)",
      acronym: "unizik",
      location: "awka",
      state: "anambra"
    },
    {
      value: "obafemi-awolowo-university",
      label: "Obafemi Awolowo University Ile-Ife (OAU)",
      acronym: "oau",
      location: "ile-ife",
      state: "osun"
    },
    {
      value: "university-of-abuja",
      label: "University of Abuja Gwagwalada (UNIABUJA)",
      acronym: "uniabuja",
      location: "gwagwalada",
      state: "abuja"
    },
    {
      value: "university-of-benin",
      label: "University of Benin (UNIBEN)",
      acronym: "uniben",
      location: "benin",
      state: "edo"
    },
    {
      value: "university-of-calabar",
      label: "University of Calabar (UNICAL)",
      acronym: "unical",
      location: "calabar",
      state: "cross-river"
    },
    {
      value: "university-of-ibadan",
      label: "University of Ibadan (UI)",
      acronym: "ui",
      location: "ibadan",
      state: "oyo"
    },
    {
      value: "university-of-ilorin",
      label: "University of Ilorin (UNILORIN)",
      acronym: "unilorin",
      location: "ilorin",
      state: "kwara"
    },
    {
      value: "university-of-jos",
      label: "University of Jos (UNIJOS)",
      acronym: "unijos",
      location: "jos",
      state: "plateau"
    },
    {
      value: "university-of-lagos",
      label: "University of Lagos Akoka (UNILAG)",
      acronym: "unilag",
      location: "akoka",
      state: "lagos"
    },
    {
      value: "university-of-maiduguri",
      label: "University of Maiduguri (UNIMAID)",
      acronym: "unimaid",
      location: "maiduguri",
      state: "borno"
    },
    {
      value: "university-of-nigeria-nsukka",
      label: "University of Nigeria Nsukka (UNN)",
      acronym: "unn",
      location: "nsukka",
      state: "enugu"
    },
    {
      value: "university-of-port-harcourt",
      label: "University of Port Harcourt (UNIPORT)",
      acronym: "uniport",
      location: "port-harcourt",
      state: "rivers"
    },
    {
      value: "university-of-uyo",
      label: "University of Uyo (UNIUYO)",
      acronym: "uniuyo",
      location: "uyo",
      state: "akwa-ibom"
    },
    {
      value: "usmanu-danfodiyo-university",
      label: "Usmanu Danfodiyo University Sokoto (UDUSOK)",
      acronym: "udusok",
      location: "sokoto",
      state: "sokoto"
    },
    {
      value: "federal-university-of-agriculture-abeokuta",
      label: "University of Agriculture Abeokuta (FUNAAB)",
      acronym: "funaab",
      location: "abeokuta",
      state: "ogun"
    },
    {
      value: "federal-university-of-agriculture-zuru",
      label: "Federal University of Agriculture Zuru (FUAZ)",
      acronym: "fuaz",
      location: "zuru",
      state: "kebbi"
    },
    {
      value: "michael-okpara-university-of-agriculture-umudike",
      label: "Michael Okpara University of Agriculture Umudike (MOUAU)",
      acronym: "mouau",
      location: "umudike",
      state: "abia"
    },
    {
      value: "king-david-university-of-medical-sciences",
      label: "King David University of Medical Sciences Uburu (KDUMS)",
      acronym: "kdums",
      location: "uburu",
      state: "ebonyi"
    },
    {
      value: "federal-university-of-health-sciences-azare",
      label: "Federal University of Health Sciences Azare (FUHSA)",
      acronym: "fuhsa",
      location: "azare",
      state: "bauchi"
    },
    {
      value: "federal-university-of-health-sciences-ila-orangun",
      label: "Federal University of Health Sciences Ila-Orangun (FUHSI)",
      acronym: "fuhsi",
      location: "ile-orangun",
      state: "osun"
    },
    {
      value: "federal-university-of-health-sciences-otukpo",
      label: "Federal University of Health Sciences Otukpo (FUHSO)",
      acronym: "fuhso",
      location: "otukpo",
      state: "benue"
    },
    {
      value: "air-force-institute-of-technology-kaduna",
      label: "Air Force Institute of Technology Kaduna (AFIT)",
      acronym: "afit",
      location: "kaduna",
      state: "kaduna"
    },
    {
      value: "federal-university-of-petroleum-resources",
      label: "Federal University of Petroleum Resources Effurun (FUPRE)",
      acronym: "fupre",
      location: "effurun",
      state: "delta"
    },
    {
      value: "federal-university-of-technology-akure",
      label: "Federal University of Technology Akure (FUTA)",
      acronym: "futa",
      location: "akure",
      state: "ondo"
    },
    {
      value: "federal-university-of-technology-babura",
      label: "Federal University of Technology Babura (FUTB)",
      acronym: "futb",
      location: "babura",
      state: "jigawa"
    },
    {
      value: "federal-university-of-technology-ikot-abasi",
      label: "Federal University of Technology Ikot Abasi (FUTIA)",
      acronym: "futia",
      location: "ikot-abasi",
      state: "akwa-ibom"
    },
    {
      value: "federal-university-of-technology-minna",
      label: "Federal University of Technology Minna (FUTMINNA)",
      acronym: "futminna",
      location: "minna",
      state: "niger"
    },
    {
      value: "federal-university-of-technology-owerri",
      label: "Federal University of Technology Owerri (FUTO)",
      acronym: "futo",
      location: "owerri",
      state: "imo"
    },
    {
      value: "nigerian-maritime-university",
      label: "Nigerian Maritime University Okerenkoko (NMU)",
      acronym: "nmu",
      location: "okerenkoko",
      state: "delta"
    },

  ];


  const listOfStateUniversities = [
    {
      value: "abia-state-university",
      label: "Abia State University, Uturu (ABSU)",
      acronym: "absu",
      location: "uturu",
      state: "abia"
    },
    {
      value: "adamawa-state-university",
      label: "Adamawa State University, Mubi (ADSU)",
      acronym: "adsu",
      location: "mubi",
      state: "adamawa"
    },
    {
      value: "adekunle-ajasin-university",
      label: "Adekunle Ajasin University, Akungba-Akoko, (AAUA)",
      acronym: "aaua",
      location: "akungba-akoko",
      state: "ondo"
    },
    {
      value: "akwa-ibom-state-university",
      label: "Akwa Ibom State University, Ikot-Akpaden, (AKSU)",
      acronym: "aksu",
      location: "ikot-akpaden",
      state: "akwa-ibom"
    },
    {
      value: "ambrose-ali-university",
      label: "Ambrose Ali University, Ekpoma, (AAU)",
      acronym: "aau",
      location: "ekpoma",
      state: "edo"
    },
    {
      value: "bauchi-state-university",
      label: "Bauchi State University, Gadau, (BASUG)",
      acronym: "basug",
      location: "gadau",
      state: "bauchi"
    },
    {
      value: "bayelsa-medical-university",
      label: "Bayelsa Medical University, Yenagoa, (BMU)",
      acronym: "bmu",
      location: "yenagoa",
      state: "bayelsa"
    },
    {
      value: "benue-state-university",
      label: "Benue State University, Makurdi, (BSUM)",
      acronym: "bsum",
      location: "makurdi",
      state: "benue"
    },
    {
      value: "borno-state-university",
      label: "Borno State University, Maiduguri, (BOSU)",
      acronym: "bosu",
      location: "maiduguri",
      state: "borno"
    },
    {
      value: "chukwuemeka-odumegwu-ojukwu-university",
      label: "Chukwuemeka Odumegwu Ojukwu University, Uli, (COOU)",
      acronym: "coou",
      location: "uli",
      state: "anambra"
    },
    {
      value: "delta-state-university",
      label: "Delta State University, Abraka, (DELSU)",
      acronym: "delsu",
      location: "abraka",
      state: "delta"
    },
    {
      value: "dennis-osadebay-university",
      label: "Dennis Osadebay University, Asaba, (DOU)",
      acronym: "dou",
      location: "asaba",
      state: "delta"
    },
    {
      value: "ebonyi-state-university",
      label: "Ebonyi State University, Abakaliki, (EBSU)",
      acronym: "ebsu",
      location: "abakaliki",
      state: "ebonyi"
    },
    {
      value: "edo-state-university",
      label: "Edo State University, Uzairue, (EDSU)",
      acronym: "edsu",
      location: "uzairue",
      state: "edo"
    },
    {
      value: "ekiti-state-university",
      label: "Ekiti State University, Ado-Ekiti, (EKSU)",
      acronym: "eksu",
      location: "ado-ekiti",
      state: "ekiti"
    },
    {
      value: "emmanuel-alayande-university-of-education",
      label: "Emmanuel Alayande University of Education, Oyo, (EAUED)",
      acronym: "eaued",
      location: "oyo",
      state: "oyo"
    },
    {
      value: "first-technical-university",
      label: "First Technical University, Ibadan, (TECH-U)",
      acronym: "tech-u",
      location: "ibadan",
      state: "oyo"
    },
    {
      value: "gombe-state-university",
      label: "Gombe State University, Tudun Wada, (GSU)",
      acronym: "gsu",
      location: "tudun-wada",
      state: "gombe"
    },
    {
      value: "ibrahim-badamasi-babangida-university",
      label: "Ibrahim Badamasi Babangida University, Lapai, (IBBU)",
      acronym: "ibbu",
      location: "lapai",
      state: "niger"
    },
    {
      value: "ignatius-ajuru-university-of-education",
      label: "Ignatius Ajuru University of Education, Port Harcourt, (IAUE)",
      acronym: "iaue",
      location: "port-harcourt",
      state: "rivers"
    },
    {
      value: "imo-state-university",
      label: "Imo State University, Owerri, (IMSU)",
      acronym: "imsu",
      location: "owerri",
      state: "imo"
    },
    {
      value: "kaduna-state-university",
      label: "Kaduna State University, Kaduna, (KASU)",
      acronym: "kasu",
      location: "kaduna",
      state: "kaduna"
    },
    {
      value: "prince-abubakar-audu-university",
      label: "Prince Abubakar Audu University, Anyigba, (PAAU)",
      acronym: "paau",
      location: "anyigba",
      state: "kogi"
    },
    {
      value: "kwara-state-university",
      label: "Kwara State University, Malete, (KWASU)",
      acronym: "kwasu",
      location: "malete",
      state: "kwara"
    },
    {
      value: "lagos-state-university-of-education",
      label: "Lagos State University of Education, Oto/Ijanikin, (LASUED)",
      acronym: "lasued",
      location: "oto-ijanikin",
      state: "lagos"
    },
    {
      value: "lagos-state-university",
      label: "Lagos State University, Ojo, (LASU)",
      acronym: "lasu",
      location: "ojo",
      state: "lagos"
    },
    {
      value: "nasarawa-state-university",
      label: "Nasarawa State University, Keffi, (NSUK)",
      acronym: "nsuk",
      location: "keffi",
      state: "nasarawa"
    },
    {
      value: "niger-delta-university",
      label: "Niger Delta University, Wilberforce Island, (NDU)",
      acronym: "ndu",
      location: "wilberforce-island",
      state: "bayelsa"
    },
    {
      value: "abdulkadir-kure-university",
      label: "Abdulkadir Kure University, Minna, (AKUM)",
      acronym: "akum",
      location: "minna",
      state: "niger"
    },
    {
      value: "olabisi-onabanjo-university",
      label: "Olabisi Onabanjo University, Ago-Iwoye, (OOU)",
      acronym: "oou",
      location: "ago-iwoye",
      state: "ogun"
    },
    {
      value: "osun-state-university",
      label: "Osun State University, Osogbo, (UNIOSUN)",
      acronym: "uniosun",
      location: "osogbo",
      state: "osun"
    },
    {
      value: "kogi-state-university",
      label: "Kogi State University, Kabba, (KSUKABBA)",
      acronym: "ksukabba",
      location: "kabba",
      state: "kogi"
    },
    {
      value: "plateau-state-university",
      label: "Plateau State University, Bokkos, (PLASU)",
      acronym: "plasu",
      location: "bokkos",
      state: "plateau"
    },
    {
      value: "sa'adatu-rimi-university-of-education",
      label: "Sa'adatu Rimi University of Education, Kumbotso, (SRUOE)",
      acronym: "sruoe",
      location: "kumbotso",
      state: "kano"
    },
    {
      value: "shehu-shagari-university-of-education",
      label: "Shehu Shagari University of Education, Sokoto, (SSUES)",
      acronym: "ssues",
      location: "sokoto",
      state: "sokoto"
    },
    {
      value: "sokoto-state-university",
      label: "Sokoto State University, Sokoto, (SSU)",
      acronym: "ssu",
      location: "sokoto",
      state: "sokoto"
    },
    {
      value: "sule-lamido-university",
      label: "Sule Lamido University, Kafin Hausa, (SLU)",
      acronym: "slu",
      location: "kafin-hausa",
      state: "jigawa"
    },
    {
      value: "tai-solarin-university-of-education",
      label: "Tai Solarin University of Education, Ijebu-Ode, (TASUED)",
      acronym: "tasued",
      location: "ijebu-ode",
      state: "ogun"
    },
    {
      value: "taraba-state-university",
      label: "Taraba State University, Jalingo, (TSU)",
      acronym: "tsu",
      location: "jalingo",
      state: "taraba"
    },
    {
      value: "umaru-musa-yar'adua-university",
      label: "Umaru Musa Yar'adua University, Katsina, (UMYU)",
      acronym: "umyu",
      location: "katsina",
      state: "katsina"
    },
    {
      value: "university-of-africa-toru-orua",
      label: "University of Africa, Toru-Orua, (UAT)",
      acronym: "uat",
      location: "toru-orua",
      state: "bayelsa"
    },
    {
      value: "university-of-cross-river-state",
      label: "University of Cross River State, Calabar, (UNICROSS)",
      acronym: "unicross",
      location: "calabar",
      state: "cross-river"
    },
    {
      value: "university-of-delta",
      label: "University of Delta, Agbor, (UNIDEL)",
      acronym: "unidel",
      location: "agbor",
      state: "delta"
    },
    {
      value: "university-of-ilesa",
      label: "University of Ilesa, Ilesa, (UNILESA)",
      acronym: "unilesa",
      location: "ilesa",
      state: "osun"
    },
    {
      value: "yobe-state-university",
      label: "Yobe State University, Damaturu, (YSU)",
      acronym: "ysu",
      location: "damaturu",
      state: "yobe"
    },
    {
      value: "yusuf-maitama-sule-university",
      label: "Yusuf Maitama Sule University, Kano, (YUMSUK)",
      acronym: "yumsuk",
      location: "kano",
      state: "kano"
    },
    {
      value: "zamfara-state-university",
      label: "Zamfara State University, Talata Mafara, (ZAMSUT)",
      acronym: "zamsut",
      location: "talata-mafara",
      state: "zamfara"
    },
    {
      value: "university-of-agriculture-and-environmental-sciences",
      label: "University of Agriculture and Environmental Sciences, Umuagwo, (UAES)",
      acronym: "uaes",
      location: "umuagwo",
      state: "imo"
    },
    {
      value: "university-of-medical-sciences",
      label: "University of Medical Sciences, Laje Road, (UNIMED)",
      acronym: "unimed",
      location: "laje-road",
      state: "ondo"
    },
    {
      value: "state-university-of-medical-and-applied-sciences",
      label: "State University of Medical and Applied Sciences, Igbo Eno, (SUMAS)",
      acronym: "sumas",
      location: "igbo-eno",
      state: "enugu"
    },
    {
      value: "bamidele-olumilua-university-of-education-science-and-technology",
      label: "Bamidele Olumilua University of Education, Science, and Technology, Ikere-Ekiti, (BOUESTI)",
      acronym: "bouesti",
      location: "ikere-ekiti",
      state: "ekiti"
    },
    {
      value: "confluence-university-of-science-and-technology",
      label: "Confluence University of Science and Technology, Osara, (CUSTECH)",
      acronym: "custech",
      location: "osara",
      state: "kogi"
    },
    {
      value: "delta-state-university-of-science-and-technology",
      label: "Delta State University of Science and Technology, Ozoro, (DSUST)",
      acronym: "dsust",
      location: "ozoro",
      state: "delta"
    },
    {
      value: "enugu-state-university-of-science-and-technology",
      label: "Enugu State University of Science and Technology, Enugu, (ESUT)",
      acronym: "esut",
      location: "enugu",
      state: "enugu"
    },
    {
      value: "gombe-state-university-of-science-and-technology",
      label: "Gombe State University of Science and Technology, Kumo, (GSUST)",
      acronym: "gsust",
      location: "kumo",
      state: "gombe"
    },
    {
      value: "aliko-dangote-university-of-science-and-technology",
      label: "Aliko Dangote University of Science and Technology, Wudil, (ADUSTECH)",
      acronym: "adustech",
      location: "wudil",
      state: "kano"
    },
    {
      value: "kebbi-state-university-of-science-and-technology",
      label: "Kebbi State University of Science and Technology, Aliero, (KSUSTA)",
      acronym: "ksusta",
      location: "aliero",
      state: "kebbi"
    },
    {
      value: "ladoke-akintola-university-of-technology",
      label: "Ladoke Akintola University of Technology, Ogbomoso (LAUTECH)",
      acronym: "lautech",
      location: "ogbomoso",
      state: "oyo"
    },
    {
      value: "lagos-state-university-of-science-and-technology",
      label: "Lagos State University of Science and Technology, Ikorodu, (LASUSTECH)",
      acronym: "lasustech",
      location: "ikorodu",
      state: "lagos"
    },
    {
      value: "olusegun-agagu-university-of-science-and-technology",
      label: "Olusegun Agagu University of Science and Technology, Okitipupa, (OAUSTECH)",
      acronym: "oaustech",
      location: "okitipupa",
      state: "ondo"
    },
    {
      value: "rivers-state-university",
      label: "Rivers State University, Port Harcourt, (RVSU)",
      acronym: "rvsu",
      location: "port-harcourt",
      state: "rivers"
    },
  ];  



  const listOfPrivateUniversities = [
    {
      value: "achievers-university",
      label: "Achievers University, Owo (AUO)",
      acronym: "auo",
      location: "owo",
      state: "ondo"
    },
    {
      value: "adeleke-university",
      label: "Adeleke University, Ede (AU)",
      acronym: "au",
      location: "ede",
      state: "osun"
    },
    {
      value: "admiralty-university-of-nigeria",
      label: "Admiralty University of Nigeria (ADUN)",
      acronym: "adun",
      location: "ibusa",
      state: "delta"
    },
    {
      value: "afe-babalola-university",
      label: "Afe Babalola University, Ado-Ekiti (ABUAD)",
      acronym: "abuad",
      location: "ado-ekiti",
      state: "ekiti"
    },
    {
      value: "african-university-of-science-and-technology",
      label: "African University of Science and Technology, Garki (AUST)",
      acronym: "aust",
      location: "garki",
      state: "abuja"
    },
    {
      value: "ahman-pategi-university",
      label: "Ahman Pategi University, Patigi (APU)",
      acronym: "apu",
      location: "patigi",
      state: "kwara"
    },
    {
      value: "ajayi-crowther-university",
      label: "Ajayi Crowther University, Oyo (ACU)",
      acronym: "acu",
      location: "oyo",
      state: "oyo"
    },
    {
      value: "al-ansar-university",
      label: "Al-Ansar University, Maiduguri (AUM)",
      acronym: "aum",
      location: "maiduguri",
      state: "borno"
    },
    {
      value: "al-hikmah-university",
      label: "Al-Hikmah University, Ilorin (AHU)",
      acronym: "ahu",
      location: "ilorin",
      state: "kwara"
    },
    {
      value: "al-istiqama-university",
      label: "Al-Istiqama University, Sumaila (AUSU)",
      acronym: "ausu",
      location: "sumaila",
      state: "kano"
    },
    {
      value: "al-qalam-university",
      label: "Al-Qalam University, Katsina (AUK)",
      acronym: "auk",
      location: "katsina",
      state: "katsina"
    },
    {
      value: "aletheia-university",
      label: "Aletheia University, Ago-Iwoye (AUAI)",
      acronym: "auai",
      location: "ago-iwoye",
      state: "ogun"
    },
    {
      value: "american-university-of-nigeria",
      label: "American University of Nigeria, Yola (AUN)",
      acronym: "aun",
      location: "yola",
      state: "adamawa"
    },
    {
      value: "anchor-university",
      label: "Anchor University, Lagos (AUL)",
      acronym: "aul",
      location: "ayobo",
      state: "lagos"
    },
    {
      value: "arthur-jarvis-university",
      label: "Arthur Jarvis University, Calabar (AJU)",
      acronym: "aju",
      location: "calabar",
      state: "cross-river"
    },
    {
      value: "atiba-university",
      label: "Atiba University, Oyo (ATUOYO)",
      acronym: "atuoyo",
      location: "oyo",
      state: "oyo"
    },
    {
      value: "augustine-university",
      label: "Augustine University, Ilara (AUI)",
      acronym: "aui",
      location: "ilara",
      state: "lagos"
    },

    {
      value: "ave-maria-university",
      label: "Ave Maria University, Piyanko (AMU)",
      acronym: "amu",
      location: "piyanko",
      state: "nasarawa"
    },
    {
      value: "azman-university",
      label: "Azman University, Kano (AZMAN)",
      acronym: "azman",
      location: "kano",
      state: "kano"
    },
    {
      value: "baba-ahmed-university",
      label: "Baba Ahmed University, Kano (BAUK)",
      acronym: "bauk",
      location: "kano",
      state: "kano"
    },
    {
      value: "babcock-university",
      label: "Babcock University, Ilishan-Remo (BU)",
      acronym: "bu",
      location: "ilishan-remo",
      state: "ogun"
    },
    {
      value: "baze-university",
      label: "Baze University, Abuja (BAZE)",
      acronym: "baze",
      location: "abuja",
      state: "abuja"
    },
    {
      value: "bells-university-of-technology",
      label: "Bells University of Technology, Ota (BUT)",
      acronym: "but",
      location: "ota",
      state: "ogun"
    },
    {
      value: "benson-idahosa-university",
      label: "Benson Idahosa University, Benin (BIU)",
      acronym: "biu",
      location: "benin",
      state: "edo"
    },
    {
      value: "bingham-university",
      label: "Bingham University, Karu (BHU)",
      acronym: "bhu",
      location: "karu",
      state: "nasarawa"
    },
    {
      value: "bowen-university",
      label: "Bowen University, Iwo (BOWEN)",
      acronym: "bowen",
      location: "iwo",
      state: "osun"
    },
    {
      value: "british-canadian-university",
      label: "British Canadian University, Obudu (BCU)",
      acronym: "bcu",
      location: "obudu",
      state: "cross-river"
    },
    {
      value: "caleb-university",
      label: "Caleb University, Imota (CALEB)",
      acronym: "caleb",
      location: "imota",
      state: "lagos"
    },
    {
      value: "canadian-university-of-nigeria",
      label: "Canadian University of Nigeria, abuja (CUN)",
      acronym: "cun",
      location: "abuja",
      state: "abuja"
    },
    {
      value: "capital-city-university",
      label: "Capital City University, Kano (CCUK)",
      acronym: "ccuk",
      location: "kano",
      state: "kano"
    },
  ]


async function addDataToFireStore(institutionType: string, ownershipType: string, schoolName: string, schoolDescription: string, schoolAcronym: string, logoUrl: string, schoolPageUrl: string, stateLocated: string, yearFounded: number, schoolsInSameStateUrl: string, schoolsInSameLocationUrl: string, areaLocated: string, schoolsOfSameOwnershipUrl: string, schoolHead: string, schoolHeadPageUrl: string, rankingPosition: number, schoolsRankingPageUrl: string, numberOfCourses:number, schoolsCoursesPageUrl:string, schoolsFeesLowest:number, schoolsFeesHighest:number, schoolsFeesPageUrl:string, jambCutOffLowest:number, jambCutOffHighest:number, schoolsJambCutOffPageUrl:string, schoolsHostel:any, schoolsHostelPageUrl:string, schoolsAdmissionCapacity:number, schoolsAdmissionCapacityPageUrl:string, addedBy:string) {
    try {
        const docRef = await addDoc(collection(db, "Schools in Nigeria"), {
            Type: institutionType,
            Ownership: ownershipType,
            Name: schoolName,
            Description: schoolDescription,
            Acronym: schoolAcronym,
            Logo: logoUrl,
            SchoolPage: schoolPageUrl,
            State: stateLocated,
            Year: yearFounded,
            SchoolsInSameState: schoolsInSameStateUrl,
            Location: areaLocated,
            SchoolsInSameLocation: schoolsInSameLocationUrl,
            schoolsOfSameOwnership: schoolsOfSameOwnershipUrl,
            Head: schoolHead,
            HeadPage: schoolHeadPageUrl,
            Ranking: rankingPosition,
            RankingPage: schoolsRankingPageUrl,
            Courses: numberOfCourses,
            CoursesPage: schoolsCoursesPageUrl,
            LowestFee: schoolsFeesLowest,
            HighestFee: schoolsFeesHighest,
            FeesPage: schoolsFeesPageUrl,
            JambCutOffLowest: jambCutOffLowest,
            JambCutOffHighest: jambCutOffHighest,
            JambCutOffPage: schoolsJambCutOffPageUrl,
            Hostel: schoolsHostel,
            HostelPage: schoolsHostelPageUrl,
            Capacity: schoolsAdmissionCapacity,
            CapacityPage: schoolsAdmissionCapacityPageUrl,
            AddedBy: addedBy

        })
        console.log("Document written with ID: ", docRef.id)
        return true;
    } catch (error) {
        console.log("Error adding document ", error)
        return false;
    }
}


export default function ProductOrderForm() {
    const [institutionType, setInstitutionType] = useState("")
    const [ownershipType, setOwnershipType] = useState("")
    const [schoolName, setSchoolName] = useState("")
    const [schoolDescription, setSchoolDescription] = useState("")
    const [schoolAcronym, setSchoolAcronym] = useState("")
    const [logoUrl, setLogoUrl] = useState("")
    const [schoolPageUrl, setSchoolPageUrl] = useState("")
    const [stateLocated, setStateLocated] = useState("")
    const [yearFounded, setYearFounded] = useState(0)
    const [schoolsInSameStateUrl, setSchoolsInSameStateUrl] = useState("")
    const [schoolsInSameLocationUrl, setSchoolsInSameLocationUrl] = useState("")
    const [areaLocated, setAreaLocated] = useState("")
    const [schoolsOfSameOwnershipUrl, setSchoolsOfSameOwnershipUrl] = useState("")
    const [schoolHead, setSchoolHead] = useState("")
    const [schoolHeadPageUrl, setSchoolHeadPageUrl] = useState("")
    const [schoolHeadType, setSchoolHeadType] = useState("")
    const [rankingPosition, setRankingPosition] = useState(0)
    const [schoolsRankingPageUrl, setSchoolsRankingPageUrl] = useState("")
    const [numberOfCourses, setNumberOfCourses] = useState(0)
    const [schoolsCoursesPageUrl, setSchoolsCoursesPageUrl] = useState("")
    const [schoolsFeesLowest, setSchoolsFeesLowest] = useState(0)
    const [schoolsFeesHighest, setSchoolsFeesHighest] = useState(0)
    const [schoolsFeesPageUrl, setSchoolsFeesPageUrl] = useState("")
    const [jambCutOffLowest, setJambCutOffLowest] = useState(0)
    const [jambCutOffHighest, setJambCutOffHighest] = useState(0)
    const [schoolsJambCutOffPageUrl, setSchoolsJambCutOffPageUrl] = useState("")
    const [schoolsHostel, setSchoolsHostel] = useState("")
    const [schoolsHostelPageUrl, setSchoolsHostelPageUrl] = useState("")
    const [schoolsAdmissionCapacity, setSchoolsAdmissionCapacity] = useState(0)
    const [schoolsAdmissionCapacityPageUrl, setSchoolsAdmissionCapacityPageUrl] = useState("")
    const [addedBy, setAddedBy] = useState("")
    const [open, setOpen] = useState(false)
    const [serverMessage, setServerMessage] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [value, setValue] = React.useState("")
    const [openStateUniversity, setOpenStateUniversity] = React.useState(false)
    const [stateUniversityValue, setStateUniversityValue] = React.useState("")
    const [openPrivateUniversity, setOpenPrivateUniversity] = React.useState(false)
    const [privateUniversityValue, setPrivateUniversityValue] = React.useState("")

    const inputElement = useRef(null);
    
    const resetInput = () => {
      const radioInputsYes = document.getElementById("thereIsHostel") as HTMLInputElement;
      const radioInputsNo = document.getElementById("thereIsNoHostel") as HTMLInputElement;
      const yearFoundedInput = document.getElementById("yearFounded") as HTMLInputElement;
      const rankingPositionInput = document.getElementById("rankingPosition") as HTMLInputElement;
      const numberOfCoursesInput = document.getElementById("numberOfCourses") as HTMLInputElement;
      const schoolsFeesLowestInput = document.getElementById("schoolsFeesLowest") as HTMLInputElement;
      const schoolsFeesHighestInput = document.getElementById("schoolsFeesHighest") as HTMLInputElement;
      const jambCutOffLowestInput = document.getElementById("jambCutOffLowest") as HTMLInputElement;
      const jambCutOffHighestInput = document.getElementById("jambCutOffHighest") as HTMLInputElement;
      const schoolsAdmissionCapacityInput = document.getElementById("schoolsAdmissionCapacity") as HTMLInputElement;
      const schoolDescriptionInput = document.getElementById("schoolDescription") as HTMLInputElement;
      const nameOfVCInput = document.getElementById("nameOfVC") as HTMLInputElement;
      const nameOfRectorInput = document.getElementById("nameOfRector") as HTMLInputElement;
      const nameOfProvostInput = document.getElementById("nameOfProvost") as HTMLInputElement;
      const nameOfDirectorInput = document.getElementById("nameOfDirector") as HTMLInputElement;

      if (radioInputsYes && radioInputsNo) { // Null check
          if (radioInputsYes.type === "radio" && radioInputsNo.type === "radio") {
              radioInputsYes.checked = false;
              radioInputsNo.checked = false;
          }
      }
      if(yearFoundedInput && rankingPositionInput && numberOfCoursesInput && schoolsFeesLowestInput && schoolsFeesHighestInput && jambCutOffLowestInput && jambCutOffHighestInput && schoolsAdmissionCapacityInput && schoolDescriptionInput){
        if(yearFoundedInput !== null && rankingPositionInput !== null && numberOfCoursesInput !== null && schoolsFeesLowestInput !== null && schoolsFeesHighestInput !== null && jambCutOffLowestInput !== null && jambCutOffHighestInput !== null && schoolsAdmissionCapacityInput !== null && schoolDescriptionInput !== null){
          yearFoundedInput.value = "";
          rankingPositionInput.value = "";
          numberOfCoursesInput.value = "";
          schoolsFeesLowestInput.value = "";
          schoolsFeesHighestInput.value = "";
          jambCutOffLowestInput.value = "";
          jambCutOffHighestInput.value = "";
          schoolsAdmissionCapacityInput.value = "";
          schoolDescriptionInput.value = "";
          
        }
      }
      if(nameOfVCInput){
        if(nameOfVCInput !== null){
          nameOfVCInput.value = "";
        }
      }
      if(nameOfRectorInput){
        if(nameOfRectorInput !== null){
          nameOfRectorInput.value = "";
        }
      }
      if(nameOfProvostInput){
        if(nameOfProvostInput !== null){
          nameOfProvostInput.value = "";
        }
      }
      if(nameOfDirectorInput){
        if(nameOfDirectorInput !== null){
          nameOfDirectorInput.value = "";
        }
      }
  };


  const resetAllInputs = () => {
    setInstitutionType("");
    setOwnershipType("");
    setSchoolName("");
    setSchoolDescription("");
    setSchoolAcronym("")
    setLogoUrl("")
    setSchoolPageUrl("")
    setStateLocated("")
    setYearFounded(0)
    setSchoolsInSameStateUrl("");
    setSchoolsInSameLocationUrl("")
    setAreaLocated("")
    setSchoolsOfSameOwnershipUrl("")
    setSchoolHead("")
    setSchoolHeadPageUrl("")
    setSchoolHeadType("")
    setRankingPosition(0)
    setSchoolsRankingPageUrl("")
    setNumberOfCourses(0)
    setSchoolsCoursesPageUrl("")
    setSchoolsFeesLowest(0)
    setSchoolsFeesHighest(0)
    setSchoolsFeesPageUrl("")
    setJambCutOffLowest(0)
    setJambCutOffHighest(0)
    setSchoolsJambCutOffPageUrl("")
    setSchoolsHostel("")
    setSchoolsHostelPageUrl("")
    setSchoolsAdmissionCapacity(0)
    setSchoolsAdmissionCapacityPageUrl("")
  }


    useEffect(()=>{
        const GenerateLogoLink =()=>{
            if(schoolAcronym !== ""){
                setLogoUrl("/"+schoolAcronym+"-"+"logo"+".png")
            }
        }
        GenerateLogoLink()
    }, [schoolAcronym])


    useEffect(()=>{
        const GeneratePageLink= ()=>{
            if(schoolName !== "" && schoolAcronym !== ""){
                setSchoolPageUrl("/"+schoolAcronym)
                setSchoolsCoursesPageUrl("/"+schoolAcronym+"-"+"courses")
                setSchoolsFeesPageUrl("/"+schoolAcronym+"-"+"school-fees")
                setSchoolsJambCutOffPageUrl("/"+schoolAcronym+"-"+"jamb-cut-off-mark")
                setSchoolsHostelPageUrl("/"+schoolAcronym+"-"+"hostel")
                setSchoolsAdmissionCapacityPageUrl("/"+schoolAcronym+"-"+"admission-capacity")
            }
        }
        GeneratePageLink()
    }, [schoolName, schoolAcronym])

    useEffect(()=>{
        const GenerateLinkToSameSchoolInSameState = ()=>{
            if(institutionType !== "" && stateLocated !== ""){
                setSchoolsInSameStateUrl("/"+institutionType+"-"+"in"+"-"+stateLocated+"-"+"state");
            }
        }
        GenerateLinkToSameSchoolInSameState()
    }, [institutionType, stateLocated])


    useEffect(()=>{
      const GenerateLinkToSameSchoolInSameLocation = ()=>{
          if(institutionType !== "" && areaLocated !== ""){
              setSchoolsInSameLocationUrl("/"+institutionType+"-"+"in"+"-"+areaLocated);
          }
      }
      GenerateLinkToSameSchoolInSameLocation()
  }, [institutionType, areaLocated])


  useEffect(()=>{
    const GenerateLinkToSchoolOfSameOwnership = ()=>{
        if(institutionType !== "" && ownershipType !== ""){
            setSchoolsOfSameOwnershipUrl("/"+ownershipType+"-"+institutionType+"-"+"in"+"-"+"nigeria");
        }
    }
    GenerateLinkToSchoolOfSameOwnership()
}, [institutionType, ownershipType])


useEffect(()=>{
  const ChooseSchoolHeadType = ()=>{
    if(institutionType === "universities"){
      setSchoolHeadType("vc")
      setSchoolsRankingPageUrl("/"+"universities"+"-"+"ranking"+"-"+"in"+"-"+"nigeria")
    }else if(institutionType === "polytechnics"){
      setSchoolHeadType("rector")
      setSchoolsRankingPageUrl("/"+"polytechnics"+"-"+"ranking"+"-"+"in"+"-"+"nigeria")
    }else if(institutionType === "colleges-of-education"){
      setSchoolHeadType("provost")
      setSchoolsRankingPageUrl("/"+"colleges-of-education"+"-"+"ranking"+"-"+"in"+"-"+"nigeria")
    }else if(institutionType === "monotechnics"){
      setSchoolHeadType("director")
      setSchoolsRankingPageUrl("/"+"monotechnics"+"-"+"ranking"+"-"+"in"+"-"+"nigeria")
    }
  }
  ChooseSchoolHeadType()
}, [institutionType])



useEffect(()=>{
  const GenerateSchoolHeadPageUrl =()=>{
    if(schoolAcronym !== "" && schoolHeadType !== ""){
      setSchoolHeadPageUrl("/"+schoolAcronym+"-"+schoolHeadType)
    }else{
      setSchoolHeadPageUrl("")
    }
  }
  GenerateSchoolHeadPageUrl()
}, [schoolAcronym, schoolHeadType])


    useEffect(() => {
        const authoredBy = () => {
            setAddedBy("Chika Agbakwuru")
        }
        authoredBy();
    }, [])



    useEffect(() => {
        const redirection = () => {
            const myPage = schoolPageUrl
            const myYear = yearFounded
            const myName = schoolName
            const myDescription = schoolDescription
            const myAcronym = schoolAcronym
            const myLogo = logoUrl
            const myProduct = "Long Jack XXXL"
            const myState = stateLocated
        }
        redirection();
    })



    type orderFormData = {
        schoolDescription: string;
        yearFounded: string;
        rankingPosition: string;
        numberOfCourses: string;
        schoolsFeesLowest: string;
        schoolsFeesHighest: string;
        jambCutOffLowest: string;
        jambCutOffHighest: string;
        schoolsAdmissionCapacity: string;
    }


    const formSchema: ZodType<orderFormData> = z.object({
        schoolDescription: z.string().trim().min(160, { message: "School description must not be less than 160 characters" }).max(250, { message: "School description must not exceed 250 characters." }),
        yearFounded: z.string(),
        rankingPosition: z.string(),
        numberOfCourses: z.string().min(1, {message: "This field cannot be left empty. You must enter the number of courses offered in the school"}),
        schoolsFeesLowest: z.string().min(1, {message: "This field cannot be left empty. You must enter the lowest fee amount"}),
        schoolsFeesHighest: z.string().min(1, {message: "This field cannot be left empty. You must enter the highest fee amount"}),
        jambCutOffLowest: z.string().min(1, {message: "This field cannot be empty. You must enter the lowest Jamb Cut Off Mark for the School"}),
        jambCutOffHighest: z.string().min(1, {message: "This field cannot be empty. You must enter the highest Jamb Cut Off Mark for the School"}),
        schoolsAdmissionCapacity: z.string().min(1, {message: "This field cannot be left empty. You must enter the admission capacity of the school"})
    })

    const { register, handleSubmit, formState: { errors } } = useForm<orderFormData>({ resolver: zodResolver(formSchema) })



    const handleOrder = async () => {
        setProcessing(true)
        const orderTime = new Date()
        const added = await addDataToFireStore(institutionType, ownershipType, schoolName, schoolDescription, schoolAcronym, logoUrl, schoolPageUrl, stateLocated, yearFounded, schoolsInSameStateUrl, schoolsInSameLocationUrl, areaLocated, schoolsOfSameOwnershipUrl, schoolHead, schoolHeadPageUrl, rankingPosition, schoolsRankingPageUrl, numberOfCourses, schoolsCoursesPageUrl, schoolsFeesLowest, schoolsFeesHighest, schoolsFeesPageUrl, jambCutOffLowest, jambCutOffHighest, schoolsJambCutOffPageUrl, schoolsHostel, schoolsHostelPageUrl, schoolsAdmissionCapacity, schoolsAdmissionCapacityPageUrl, addedBy);
        if (added) {
            setProcessing(false)
            resetAllInputs()
            setServerMessage(true)
        }
    }


    return (
        <div>

            <Image src="/attention.gif" alt="Place Order for Long Jack XXXL" className="img-fluid mx-auto d-block" height={100} width={100}></Image>
            <div className="rounded shadow p-2 m-2 content-with-white-background">
                <h3 className="text-center h3">Fill The Form Below To Place Order</h3>
                <div className="mb-2">
                    <form onSubmit={handleSubmit(handleOrder)}>
                    <div className = "flex mt-4 justify-between">
                                <label htmlFor="institutionType" className="">Select Type of Institution</label>
                                <select className="ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" name="institutionType" id="institutionType" onChange={(e) => {setInstitutionType(e.currentTarget.value); setSchoolName(""); setSchoolAcronym(""); setLogoUrl(""); setValue(""); setStateUniversityValue(""); setPrivateUniversityValue(""); setSchoolPageUrl(""); setAreaLocated(""); setStateLocated(""); setSchoolsInSameStateUrl(""); setSchoolsInSameLocationUrl(""); setSchoolsCoursesPageUrl(""); setSchoolsFeesPageUrl(""); setSchoolsJambCutOffPageUrl(""); setSchoolsHostel(""); setSchoolsHostelPageUrl(""); setSchoolsAdmissionCapacity(0); setSchoolsAdmissionCapacityPageUrl(""); resetInput();}}>
                                    <option value = "Select">--select--</option>
                                    <option value = "universities">University</option>
                                    <option value = "polytechnics">Polytechnic</option>
                                    <option value = "colleges-of-education">College of Education</option>
                                    <option value = "monotechnics">Monotechnic</option>
                                </select>
                        </div>
                        <div className = "flex mt-4 justify-between">
                                <label htmlFor="ownershipType" className="">Select Type of Ownership</label>
                                <select className="ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" name="ownershipType" id="ownershipType" onChange={(e) => { setOwnershipType(e.currentTarget.value); setSchoolName(""); setSchoolAcronym(""); setLogoUrl(""); setValue(""); setStateUniversityValue(""); setPrivateUniversityValue(""); setSchoolPageUrl(""); setAreaLocated(""); setStateLocated(""); setSchoolsInSameStateUrl(""); setSchoolsInSameLocationUrl(""); setSchoolsCoursesPageUrl(""); setSchoolsFeesPageUrl(""); setSchoolsJambCutOffPageUrl(""); setSchoolsHostel(""); setSchoolsHostelPageUrl(""); setSchoolsAdmissionCapacity(0); setSchoolsAdmissionCapacityPageUrl(""); resetInput();}}>
                                    <option value = "select">--select--</option>
                                    <option value = "federal">Federal</option>
                                    <option value = "state">State</option>
                                    <option value = "private">Private</option>
                                </select>
                        </div>
                        {/* CONDITIONAL RENDERING: FOR FEDERAL UNIVERSITIES STARTS HERE */}
{institutionType === "universities" && ownershipType === "federal" &&
  <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="mt-4 p-2 w-full justify-between"
      >
        <div className="truncate max-w-full">
          {value
            ? listOfFederalUniversities.find((framework) => framework.value === value)?.label
            : "Select federal university..."}
        </div>
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search school..." className="h-9" />
        <CommandEmpty>No schoool found.</CommandEmpty>
        
        <CommandGroup>
        <CommandList>
          {listOfFederalUniversities.map((framework) => (
            
            <CommandItem
              key={framework.value}
              value={framework.value}
              onSelect={(currentValue:any) => {
                setValue(currentValue === value ? "" : currentValue)
                setSchoolName(currentValue)
                setSchoolAcronym(framework.acronym)
                setAreaLocated(framework.location)
                setStateLocated(framework.state)
                resetInput()
                setSchoolHead("")
                setSchoolDescription("")
                setOpen(false)
              }}
            >
              <div className="truncate max-w-full">
                {framework.label}
              </div>
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  value === framework.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
            
          ))}
          </CommandList>
        </CommandGroup>
        
      </Command>
    </PopoverContent>
  </Popover>
}
{/* CONDITIONAL RENDERING: FOR FEDERAL UNIVERSITIES ENDS HERE */}

{/* CONDITIONAL RENDERING: FOR STATE UNIVERSITIES STARTS HERE */}
{institutionType === "universities" && ownershipType === "state" &&
  <Popover open={openStateUniversity} onOpenChange={setOpenStateUniversity}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={openStateUniversity}
        className="mt-4 p-2 w-full justify-between"
      >
        <div className="truncate max-w-full">
          {stateUniversityValue
            ? listOfStateUniversities.find((stateUni) => stateUni.value === stateUniversityValue)?.label
            : "Select state university..."}
        </div>
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search school..." className="h-9" />
        <CommandEmpty>No schoool found.</CommandEmpty>
        
        <CommandGroup>
        <CommandList>
          {listOfStateUniversities.map((stateUni) => (
            
            <CommandItem
              key={stateUni.value}
              value={stateUni.value}
              onSelect={(currentValue) => {
                setStateUniversityValue(currentValue === value ? "" : currentValue);
                setSchoolName(currentValue);
                setSchoolAcronym(stateUni.acronym);
                setAreaLocated(stateUni.location)
                setStateLocated(stateUni.state)
                resetInput()
                setSchoolHead("")
                setSchoolDescription("")
                setOpenStateUniversity(false)
              }}
            >
              <div className="truncate max-w-full">
                {stateUni.label}
              </div>
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  value === stateUni.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
            
          ))}
          </CommandList>
        </CommandGroup>
        
      </Command>
    </PopoverContent>
  </Popover>
}
{/* CONDITIONAL RENDERING: FOR STATE UNIVERSITIES ENDS HERE */}

{/* CONDITIONAL RENDERING: FOR PRIVATE UNIVERSITIES STARTS HERE */}
{institutionType === "universities" && ownershipType === "private" &&
  <Popover open={openPrivateUniversity} onOpenChange={setOpenPrivateUniversity}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={openPrivateUniversity}
        className="mt-4 p-2 w-full justify-between"
      >
        <div className="truncate max-w-full">
          {privateUniversityValue
            ? listOfPrivateUniversities.find((privateUni) => privateUni.value === privateUniversityValue)?.label
            : "Select private university..."}
        </div>
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search school..." className="h-9" />
        <CommandEmpty>No schoool found.</CommandEmpty>
        
        <CommandGroup>
        <CommandList>
          {listOfPrivateUniversities.map((privateUni) => (
            
            <CommandItem
              key={privateUni.value}
              value={privateUni.value}
              onSelect={(currentValue) => {
                setPrivateUniversityValue(currentValue === value ? "" : currentValue);
                setSchoolName(currentValue);
                setSchoolAcronym(privateUni.acronym);
                setAreaLocated(privateUni.location)
                setStateLocated(privateUni.state)
                resetInput()
                setSchoolHead("")
                setSchoolDescription("")
                setOpenPrivateUniversity(false)
              }}
            >
              <div className="truncate max-w-full">
                {privateUni.label}
              </div>
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  value === privateUni.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
            
          ))}
          </CommandList>
        </CommandGroup>
        
      </Command>
    </PopoverContent>
  </Popover>
}
{/* CONDITIONAL RENDERING: FOR PRIVATE UNIVERSITIES ENDS HERE */}

{logoUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "generatedLogoUrl">{schoolAcronym} Logo Url Already Generated</label>
        <input type = "text" id = "generatedLogoUrl" value = {logoUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }

{schoolPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "generatedPageUrl">{schoolAcronym} Page Url Already Generated</label>
        <input type = "text" id = "generatedPageUrl" value = {schoolPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }

                        {/*
                        <div>
                            <input type="text" id="nameOfSchool" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Name of the School" required {...register("schoolName")} onChange={(e) => { setSchoolName(e.currentTarget.value) }} />
                            {errors.schoolName && <span className='text-red-500 error-message'>{errors.schoolName.message}</span>}
                        </div>
                    */}
                    
                    {schoolHeadPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "generatedSchoolHeadPageUrl">{schoolAcronym} {schoolHeadType} Page Url Already Generated</label>
        <input type = "text" id = "generatedSchoolHeadPageUrl" value = {schoolHeadPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
                        {stateLocated !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "stateOfLocation">State Where School Is Located Already Generated</label>
        <input type = "text" id = "stateOfLocation" value = {stateLocated} className="ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
                        {schoolsInSameStateUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsInSameState">URL of {institutionType} in {stateLocated} Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsInSameState" value = {schoolsInSameStateUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {areaLocated !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "areaOfLocation">Area of School Location Already Generated</label>
        <input type = "text" id = "areaOfLocation" value = {areaLocated} className="ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsInSameLocationUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsInSameLocation">URL of {institutionType} in {areaLocated} Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsInSameLocation" value = {schoolsInSameLocationUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsOfSameOwnershipUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsOfSameOwnership">URL of {ownershipType} {institutionType} in Nigeria Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsOfSameOwnership" value = {schoolsOfSameOwnershipUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsRankingPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsRanking">URL of {institutionType} Ranking in Nigeria Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsRanking" value = {schoolsRankingPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsCoursesPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsCourses">URL of {schoolName} ({schoolAcronym}) Courses Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsCourses" value = {schoolsCoursesPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsFeesPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsFees">URL of {schoolName} ({schoolAcronym}) School Fees Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsFees" value = {schoolsFeesPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsJambCutOffPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsJambCutOff">URL of {schoolName} ({schoolAcronym}) Jamb Cut Off Mark Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsJambCutOff" value = {schoolsJambCutOffPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" readOnly/>
    </div>
    }
    {schoolsHostelPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsHostel">URL of {schoolName} ({schoolAcronym}) Hostel Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsHostel" value = {schoolsHostelPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" readOnly/>
    </div>
    }
    {schoolsAdmissionCapacityPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsAdmissionCapacity">URL of {schoolName} ({schoolAcronym}) Admission Capacity Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsAdmissionCapacity" value = {schoolsAdmissionCapacityPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" readOnly/>
    </div>
    }
    {addedBy !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "addedBy">URL of {schoolName} ({schoolAcronym}) details added by:</label>
        <input type = "text" id = "addedBy" value = {addedBy} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" readOnly/>
    </div>
    }
    <hr className = "mt-4 mb-4 outline-dotted outline-blue-500"/>
                        {institutionType === "universities" &&
                      <div>
                      <input type="text" id="nameOfVC" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Name of the Vice Chancellor" onChange={(e) => { setSchoolHead(e.currentTarget.value) }} />
                      
                  </div>
                    }
                    {institutionType === "polytechnics" &&
                      <div>
                      <input type="text" id="nameOfRector" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Name of the Rector" required onChange={(e) => { setSchoolHead(e.currentTarget.value) }} />
                      
                  </div>
                    }
                    {institutionType === "colleges-of-education" &&
                      <div>
                      <input type="text" id="nameOfProvost" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Name of the Provost" onChange={(e) => { setSchoolHead(e.currentTarget.value) }} />
                      
                  </div>
                    }
                    {institutionType === "monotechnics" &&
                      <div>
                      <input type="text" id="nameOfDirector" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Name of the Director" onChange={(e) => { setSchoolHead(e.currentTarget.value) }} />
                      
                  </div>
                    }
                    <div className="mt-2">
                            <textarea id = "schoolDescription" className = "mt-4 p-2 h-15 outline outline-2 outline-slate-100 rounded w-full" placeholder = "School description" required {...register("schoolDescription")} onChange={(e) => { setSchoolDescription(e.currentTarget.value) }}></textarea>
                            {errors.schoolDescription && <span className='text-red-500 error-message'>{errors.schoolDescription.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="yearFounded" placeholder = "Year The School Was Founded" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("yearFounded")} onChange={(e) => { const year = parseInt(e.currentTarget.value); setYearFounded(isNaN(year) ? 0 : year); }} />
                            {errors.yearFounded && <span className='text-red-500 error-message'>{errors.yearFounded.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="rankingPosition" placeholder = "Ranking Position of The School" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("rankingPosition")} onChange={(e) => { const ranking = parseInt(e.currentTarget.value); setRankingPosition(isNaN(ranking) ? 0 : ranking) }} />
                            {errors.rankingPosition && <span className='text-red-500 error-message'>{errors.rankingPosition.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="numberOfCourses" placeholder = "Number of Courses Offered in The School" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("numberOfCourses")} onChange={(e) => { const courses = parseInt(e.currentTarget.value); setNumberOfCourses(isNaN(courses) ? 0 : courses) }} />
                            {errors.numberOfCourses && <span className='text-red-500 error-message'>{errors.numberOfCourses.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="schoolsFeesLowest" placeholder = "School Fees (Lowest Amount)" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("schoolsFeesLowest")} onChange={(e) => { const lowestFee = parseInt(e.currentTarget.value); setSchoolsFeesLowest(isNaN(lowestFee) ? 0 : lowestFee) }} />
                            {errors.schoolsFeesLowest && <span className='text-red-500 error-message'>{errors.schoolsFeesLowest.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="schoolsFeesHighest" placeholder = "School Fees (Highest Amount)" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("schoolsFeesHighest")} onChange={(e) => { const highestFee = parseInt(e.currentTarget.value); setSchoolsFeesHighest(isNaN(highestFee) ? 0 : highestFee) }} />
                            {errors.schoolsFeesHighest && <span className='text-red-500 error-message'>{errors.schoolsFeesHighest.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="jambCutOffLowest" placeholder = "JAMB Cut Off Mark (Lowest)" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("jambCutOffLowest")} onChange={(e) => { const jambLowest = parseInt(e.currentTarget.value); setJambCutOffLowest(isNaN(jambLowest) ? 0 : jambLowest) }} />
                            {errors.jambCutOffLowest && <span className='text-red-500 error-message'>{errors.jambCutOffLowest.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="jambCutOffHighest" placeholder = "JAMB Cut Off Mark (Highest)" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("jambCutOffHighest")} onChange={(e) => { const jambHighest = parseInt(e.currentTarget.value); setJambCutOffHighest(isNaN(jambHighest) ? 0 : jambHighest) }} />
                            {errors.jambCutOffHighest && <span className='text-red-500 error-message'>{errors.jambCutOffHighest.message}</span>}
                        </div>
                        <div className = "mt-4 p-2 outline outline-2 outline-slate-100 rounded w-full">
                        <h4>Does the school have hostel?</h4>
                        <div className="mt-2">
                            <input type="radio" value = "Yes" id="thereIsHostel" name = "hostelAvailability" className="" onClick={(e) => { setSchoolsHostel(e.currentTarget.value) }} />
                            <label htmlFor = "thereIsHostel" className = "ms-2">Yes</label>
                        </div>
                        <div className="mt-2">
                            <input type="radio" value = "No" id="thereIsNoHostel" name = "hostelAvailability" className="" onClick={(e) => { setSchoolsHostel(e.currentTarget.value) }} />
                            <label htmlFor = "thereIsNoHostel" className = "ms-2">No</label>
                        </div>
                        </div>
                        <div className="mt-2">
                            <input type="number" id="schoolsAdmissionCapacity" placeholder = "Admission Capacity" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("schoolsAdmissionCapacity")} onChange={(e) => { const admission = parseInt(e.currentTarget.value); setSchoolsAdmissionCapacity(isNaN(admission) ? 0 : admission) }} />
                            {errors.schoolsAdmissionCapacity && <span className='text-red-500 error-message'>{errors.schoolsAdmissionCapacity.message}</span>}
                        </div>
    {/*
                        <div className="mt-2 d-none">
                            <label htmlFor="orderID">Order ID <span className="text-danger"> *</span></label>
                            <input type="text" id="orderID" value={orderID} className="form-control" placeholder="enter your phone number here" required {...register("orderID")} />
                        </div>
    */}
    {institutionType !== "" && ownershipType !== "" && schoolName !== "" && schoolDescription !== "" && schoolAcronym !== "" && logoUrl !== "" && schoolPageUrl !== "" && stateLocated !== "" && yearFounded > 0 && schoolsInSameStateUrl !== "" && schoolsInSameLocationUrl !== "" && areaLocated !== "" && schoolsOfSameOwnershipUrl !== "" && schoolHead !== "" && schoolHeadPageUrl !== "" && rankingPosition > 0 && schoolsRankingPageUrl !== "" && numberOfCourses > 0 && schoolsCoursesPageUrl !== "" && schoolsFeesLowest > 0 && schoolsFeesHighest > 0 && schoolsFeesPageUrl !== "" && jambCutOffLowest > 0 && jambCutOffHighest > 0 && schoolsJambCutOffPageUrl !== "" && schoolsHostel !== "" && schoolsHostelPageUrl !== "" && schoolsAdmissionCapacity > 0 && schoolsAdmissionCapacityPageUrl !== "" ?
                        <div className="mt-2">
                            {processing ? <ButtonWithIcon type = "button" style = "filled-enabled-with-and-without-icon" icon = {<ClipLoader color='rgba(255, 255, 255, 1)'/>} iconStyle = "filled-enabled-icon-styling" label = "Processing..." stateLayer = "filled-enabled-with-icon-state-layer" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/> :
                                <ButtonWithOutIcon type = "submit" style = "filled-enabled-with-and-without-icon" label = "Submit" statelayer = "filled-enabled-without-icon-state-layer" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/>
                            }
                        </div> :
                        <div className = "mt-2">
                          <ButtonWithOutIcon type = "button" style = "filled-disabled-with-and-without-icon" label = "Submit" stateLayer = "filled-disabled-without-icon-state-layer" textWrapper = "filled-disabled-icon-text-wrapper"/>
                        </div>
                        }

                        {serverMessage &&
                        
                        <>
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
                            zIndex: 9998, // Overlay should be behind the modal
                        }}
                    ></div>
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            border: "1px solid black",
                            minWidth: "300px",
                            maxWidth: "90vw",
                            maxHeight: "95vh",
                            overflow: "auto",
                            backgroundColor: "white",
                            borderRadius: "15px",
                            zIndex: 9999, // Modal should be above the overlay
                        }}
                        className="enrollment-modal-container"
                    >
                        <div className="p-2 d-flex justify-content-between align-items-center" style={{borderRadius: "15px 15px 0 0", backgroundColor: "white" }}>
                            <p className="">School added successfully!</p>
                        </div>
                        <div className="p-2 flex justify-end">
                        <ButtonWithOutIcon type = "button" style = "text-enabled-with-and-without-icon" label = "Close" statelayer = "text-enabled-without-icon-state-layer" textWrapper = "text-enabled-with-and-without-icon-text-wrapper" action = {()=>{window.location.href = "/dashboard/schools"}}/>
                        </div>
                    </div>
                </>

                        }
                    </form>
                </div>
            </div>
        </div>
    )
}