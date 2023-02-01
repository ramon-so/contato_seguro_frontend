import { render, screen } from '@testing-library/react';
import App from './App';
import CenterDiv from './components/CenterDiv';
import CenterDivEmpresas from './components/centerDivEmpresas';

test('render CenterDiv', () => {
  render(<CenterDiv />);
  const linkElement = document.getElementById('centerDivImg');
  expect(linkElement).toBeInTheDocument();
  render(<CenterDivEmpresas />);
  const linkElement2 = document.getElementById('centerDivEmpresa');
  expect(linkElement2).toBeInTheDocument();
});