import './../_assets/css/CenterDiv.css'
import logo from './../_assets/img/logo.png'
import EmpresasTable from './EmpresasTable'
import BuscaEmpresas from './BarraBuscaEmpresas'


function CenterDivEmpresas(){
    return <div class='Container'>
                <div class='CenterDiv'>
                    <div class="CenterImage" id='centerDivEmpresa'>
                        <img src={logo} class="imgLogo" alt="" />
                    </div>
                    <BuscaEmpresas />
                    <EmpresasTable />
                </div>
            </div>
}

export default CenterDivEmpresas