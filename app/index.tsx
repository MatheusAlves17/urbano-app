import React from 'react';
import { Redirect } from 'expo-router';

/**
 * Redireciona para a tela de login
 */
const Root = () => {
  return <Redirect href="/Login/" />;
};

export default Root;
