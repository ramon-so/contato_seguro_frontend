import './../_assets/css/CenterDiv.css'
import logo from './../_assets/img/logo.png'
import UsuariosTable from './UsuariosTable'
import Busca from './BarraBusca'


function CenterDiv(){
    return <div class='Container'>
                <div class='CenterDiv'>
                    <div class="CenterImage" id='centerDivImg'>
                        <img src={logo} class="imgLogo" alt="" />
                    </div>
                    <Busca />
                    <UsuariosTable />
                </div>
            </div>
}

export default CenterDiv