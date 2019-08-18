import React, { Component } from 'react';
import api, {dataAuth} from '../../services/api';
import ReactLoading from 'react-loading';
import { FaStar } from 'react-icons/fa';
import './Starreds.css';

export default class Starreds extends Component {

    state = {
        starreds: [],
        loadingStarreds: false,
        error: '',
        userLogin: '',
        passwordLogin: ''
    }

    componentDidMount() {
        const { userLogin } = this.props

        this.setState({ loadingStarreds: true, userLogin: userLogin })

        api.get(`/users/${userLogin}/starred`)
            .then(res =>{ console.log(res.data); this.setState({ starreds: res.data, loadingStarreds: false })})
            .catch(() => this.setState({ error: 'Falha em obter os dados do usuário', loadingStarreds: false }))
    }


    unstarRepo = async (owner, repo) => {
        if(!this.state.passwordLogin) {
            let password = await prompt('Coloque a sua senha')
            this.setState({passwordLogin: password})
        }

        let auth = btoa(this.state.userLogin + ":" + this.state.passwordLogin)

        api.delete(`/user/starred/${owner}/${repo}?client_id=${dataAuth.client_id}&client_secret=${dataAuth.client_secret}`, {
            headers: {
                'authorization': `Basic ${auth}`,
            }
        })
        .then((res) => { console.log(res)})
        .catch((err) => {
            alert('Erro ao remover estrela do repositório. Tente novamente com a senha correta')
            this.setState({passwordLogin: ''})
        })
    }


    starRepo = async (owner, repo) => {
        if(!this.state.passwordLogin) {
            let password = await prompt('Coloque a sua senha')
            this.setState({passwordLogin: password})
        }

        let auth = btoa(this.state.userLogin + ":" + this.state.passwordLogin)

        api.put(`/user/starred/${owner}/${repo}?client_id=${dataAuth.client_id}&client_secret=${dataAuth.client_secret}`, {}, {
            headers: {
                'authorization': `Basic ${auth}`,
            }
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            alert('Erro ao adicionar estrela no repositório. Tente novamente com a senha correta')
            this.setState({passwordLogin: ''})
        })
    }


    render() {
        const { loadingStarreds, starreds, error } = this.state;

        return (
            <div className="starreds-container show-slow">
                <h2>Repositórios salvos como estrela</h2>
                {loadingStarreds ? (
                    <div className="starreds-loading">
                        <ReactLoading type={'bubbles'} color={'#666666'} height={100} width={100} />
                    </div>
                ) : (
                        <div>
                            {starreds.length ? (
                                <ul>
                                    {starreds.map(star => (
                                        <li key={star.node_id}>
                                            <a href={star.html_url} target="blank">{star.name}</a>
                                            <div><small>{star.description}</small></div>

                                            <footer>
                                                <button className="btn" 
                                                    onClick={() => this.starRepo(star.owner.login, star.name)}>
                                                    <FaStar/> star
                                                </button>
                                                <button className="btn" 
                                                    onClick={() => this.unstarRepo(star.owner.login, star.name)}>
                                                    <FaStar/> unstar
                                                </button>
                                            </footer>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                    <div className="starreds-message">Não há repositórios salvos como estrela para esse usuário.</div>
                                )}

                            { error && <div className="starreds-message">{error}</div>}
                        </div>
                    )}
            </div>

        );
    }
}
