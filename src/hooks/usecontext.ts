import React from 'react';
import { getCookie } from 'tools';

const prog_lang = getCookie("prog_lang");
export const MyContext = React.createContext(prog_lang || null);