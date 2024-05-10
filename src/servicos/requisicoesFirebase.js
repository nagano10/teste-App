import {
    AuthErrorCodes,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";


function errosFirebase(error) {
    let mensagem = '';
    switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
            mensagem = "Email já utilizado.";
            break;
        case AuthErrorCodes.INVALID_EMAIL:
            mensagem = "Email inválido!";
            break;
        case AuthErrorCodes.WEAK_PASSWORD:
            mensagem = "A senha precisa de no mínimo 6 caracteres";
            break;
        default:
            mensagem = "Erro desconhecido";
    }
    return mensagem;
}


export async function cadastrar(nomeCompleto, apelido, email, senha) {
    try {
        const resultado = await createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                // Aqui você tem acesso ao userCredential dentro do escopo do then
                console.log("Usuário criado:", userCredential.user);

                const userId = userCredential.user.uid;

                const userInfo = {
                    nomeCompleto: nomeCompleto,
                    apelido: apelido,
                    email: email,
                    dataNascimento: "",
                    genero: "",
                    endereco: "",
                    telefone: "",
                    autorizado: false,
                    bebida: "",
                    comida: "",
                    esporteFavorito: "",
                    timeDoCoracao: "",
                    generoMusical: "",
                    artistaFavorito: "",
                    hobby: "",
                    planoClube: "",
                    dataInicioPlano: "",
                    proximoAtendimento: "",
                    diaAtendimento: "",
                    frequenciaAtendimento: ""
                };


                setDoc(doc(db, "usuarios", userId), userInfo);

                console.log("Usuário cadastrado com sucesso:", userCredential.user);

                return "Sucesso!";
            })
            .catch((error) => {
                console.error("Erro ao criar usuário:", error);
                return errosFirebase(error);
            });

        return resultado;
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return "Erro ao cadastrar usuário";
    }
}

export async function logar(email, senha) {
    const resultado = await signInWithEmailAndPassword(auth, email, senha)
        .then((dadosDoUsuario) => {
            console.log(dadosDoUsuario)
            
            return "Sucesso!"
        })
        .catch((error) => {
            console.log(error)
            return "E-mail e senha não conferem."
        });
    return resultado;
}

export async function atualizarPreferencias(bebida, comida, esporteFavorito, timeFavorito, generoFavorito, artistaFavorito, hobby) {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const preferencias = {

            bebida: bebida,
            comida: comida,
            esporteFavorito: esporteFavorito,
            timeDoCoracao: timeFavorito,
            generoMusical: generoFavorito,
            artistaFavorito: artistaFavorito,
            hobby: hobby

        }



        await updateDoc(doc(db, 'usuarios', idUsuario), preferencias)

        return "Sucesso!"
    }
    catch (error) {
        return "Erro ao atualizar preferencias"
    }

}

export const obterIdUsuarioLogado = () => {
    const usuarioAtual = auth.currentUser;
    if (usuarioAtual) {
        const idUsuario = usuarioAtual.uid;
        console.log('ID do usuário logado:', idUsuario);
        return idUsuario;
    } else {
        console.log('Nenhum usuário logado.');
        return null;
    }
};

export async function aprovarUsuario(idUsuario, planoClube, dataInicioPlano, proximoAtendimento, dataAtendimento, horarioAtendimento, frequencia) {
    try {
        await updateDoc(doc(db, 'usuarios', idUsuario), {
            autorizado: true,
            planoClube: planoClube,
            dataInicioPlano: dataInicioPlano,
            proximoAtendimento: proximoAtendimento,
            diaAtendimento: dataAtendimento,
            horarioAtendimento: horarioAtendimento,
            frequenciaAtendimento: frequencia

        });
        console.log("id so usuario q foi cadastrado ", planoClube)

        return "Sucesso!"
    }
    catch (error) {
        console.log(error)
        return "Erro ao aprovar usuario."
    }
}

export async function deletarUsuario(idUsuario) {
    try {

        await deleteDoc(doc(db, 'usuarios', idUsuario));

        return "Sucesso!"
    }
    catch (error) {
        console.log(error)
        return "Erro ao deletar usuario."
    }
}



export async function buscarApelidoUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();
        const docRef = doc(db, 'usuarios', idUsuario);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const apelido = userData.apelido;
            console.log(apelido);
            return apelido;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}



export async function buscarNomeUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const nome = userData.nomeCompleto;
            console.log(nome);
            return nome;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarDataUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const dataNascimento = userData.dataNascimento;
            console.log(dataNascimento);
            return dataNascimento;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarGeneroUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const generoUsuario = userData.genero;
            console.log(generoUsuario);
            return generoUsuario;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarEnderecoUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const enderecoUser = userData.endereco;
            console.log(enderecoUser)
            return enderecoUser;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarTelefoneUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const telUser = userData.telefone;
            console.log(telUser)
            return telUser;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarBebidaUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const bebidaUser = userData.bebida;
            console.log(bebidaUser)
            return bebidaUser;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarComidaUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const comidaUser = userData.comida;
            console.log(comidaUser)
            return comidaUser;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarArtistaFavorito() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const artistaUser = userData.artistaFavorito;
            console.log(artistaUser)
            return artistaUser;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarSomUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const somUser = userData.generoMusical;
            console.log(somUser)
            return somUser;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarEsporteUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const esporteUser = userData.esporteFavorito;
            console.log(esporteUser)
            return esporteUser;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarTimeUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const timeUser = userData.timeDoCoracao;
            console.log(timeUser)
            return timeUser;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarPlanoUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const planoUser = userData.planoClube;
            console.log(planoUser)
            return planoUser;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarDataAssinaturaUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const dataAssUsuario = userData.dataInicioPlano;
            console.log(dataAssUsuario)
            return dataAssUsuario;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function buscarDataExpUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const dataFimUser = userData.dataFinalPlano;
            console.log(dataFimUser)
            return dataFimUser;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}




export async function buscarEmailUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userEmail = userData.email;
            console.log(userEmail)
            return userEmail;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarUserAutorizado() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userAutorizado = userData.autorizado;
            console.log(userAutorizado)
            return userAutorizado;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarDadosUsuario() {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const nomeCompleto = userData.nomeCompleto;
            const endereco = userData.endereco;
            const apelido = userData.apelido;
            const email = userData.email;
            const telefone = userData.telefone;
            const dataNascimento = userData.dataNascimento;
            const genero = userData.genero;
            const comida = userData.comida;
            const bebida = userData.bebida;
            const artistaFavorito = userData.artistaFavorito;
            const generoMusical = userData.generoMusical;
            const esporteFavorito = userData.esporteFavorito;

            console.log(nomeCompleto, endereco, apelido, email, telefone, dataNascimento, genero);
            return { nomeCompleto, esporteFavorito, musica, artistaFavorito, generoMusical, bebida, endereco, apelido, email, telefone, dataNascimento, genero, comida };
        } else {
            console.log("Não há documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function atualizarPerfil(apelido, dataNascimento, endereco, nomeCompleto, telefone, genero) {
    try {
        const idUsuario = obterIdUsuarioLogado();

        const perfil = {

            apelido: apelido,
            dataNascimento: dataNascimento,
            endereco: endereco,
            genero: genero,
            nomeCompleto: nomeCompleto,
            telefone: telefone,

        }



        await updateDoc(doc(db, 'usuarios', idUsuario), perfil)


        return "Sucesso!"
    }
    catch (error) {
        console.log(error)
        return "Erro ao atualizar perfil"
    }

}

export async function atualizarPlanoCliente(idUsuario, planoClube, dataInicioPlano) {
    try {


        const perfil = {

            planoClube: planoClube,
            dataInicioPlano: dataInicioPlano

        }



        await updateDoc(doc(db, 'usuarios', idUsuario), perfil)


        return "Sucesso!"
    }
    catch (error) {
        console.log(error)
        return "Erro ao atualizar perfil"
    }

}

export async function buscarDiaDoAtendimento(idUsuario) {
    try {
        const docRef = doc(db, 'usuarios', idUsuario);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const diaAtendimento = userData.diaAtendimento;
            console.log(diaAtendimento);
            return diaAtendimento;
        } else {
            console.log("Nao ha documento");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function solicitarAlteracaoAtendimento(idUsuario, ocorrencia, dataAtendimento, horarioAtendimento, planoUsuario, apelidoUsuario) {
    try {


        const userInfo = {
            ocorrencia: ocorrencia,
            dataAtendimento: dataAtendimento,
            horarioAtendimento: horarioAtendimento,
            idUsuario: idUsuario,
            planoUsuario: planoUsuario,
            apelido: apelidoUsuario,
        };


        setDoc(doc(db, "agendamentos", idUsuario), userInfo);

        console.log("Solicitacao concluida com sucesso!");

        return 'Sucesso!'

    } catch (error) {
        console.log(error)
        return 'Erro'

    }
}

export async function recusarAlteracaoHorario(idUsuario) {

    try {

        await deleteDoc(doc(db, 'agendamentos', idUsuario));

        return "Sucesso!"
    }
    catch (error) {
        console.log(error)
        return "Erro ao deletar usuario."
    }
}

export async function alterarAtendimento(idUsuario, diaAtendimento, horarioAtendimento) {
    try {


        const alteracao = {

            proximoAtendimento: diaAtendimento,
            horarioAtendimento: horarioAtendimento

        }



        await updateDoc(doc(db, 'usuarios', idUsuario), alteracao)

        return "Sucesso!"
    }
    catch (error) {
        return "Erro ao atualizar nova data"
    }

}



