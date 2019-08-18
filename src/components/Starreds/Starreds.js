import React, { Component } from 'react';
import api, { dataAuth } from '../../services/api';
import ReactLoading from 'react-loading';
import { FaStar } from 'react-icons/fa';
import './Starreds.css';
import Snackbar from '@material-ui/core/SnackBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Starreds extends Component {

    state = {
        starreds: [],
        loadingStarreds: false,
        error: '',
        userLogin: '',
        passwordLogin: '',
        snackbaropen: false,
        snackbarmsg: '',
        openDialog:false,
        tempStarData: {
            owner: '',
            repo: '',
            isStar: false
        }
    }

    componentDidMount() {
        const { userLogin } = this.props

        this.setState({ loadingStarreds: true, userLogin: userLogin })

        api.get(`/users/${userLogin}/starred`)
            .then(res => this.setState({ starreds: res.data, loadingStarreds: false }))
            .catch(() => this.setState({ error: 'Falha em obter os dados do usuário', loadingStarreds: false }))
    }

    verifyAuthUser = (owner, repo, isStar) => {
        if (this.state.passwordLogin) {
            
        }
    }

    unstarRepo = async (owner, repo) => {
        if (!this.state.passwordLogin) {
            let password = await prompt('Coloque a sua senha')
            this.setState({ passwordLogin: password })
        }

        let auth = btoa(this.state.userLogin + ":" + this.state.passwordLogin)

        api.delete(`/user/starred/${owner}/${repo}?client_id=${dataAuth.client_id}&client_secret=${dataAuth.client_secret}`, {
            headers: {
                'authorization': `Basic ${auth}`,
            }
        })
            .then((res) => { this.openSnackbar('Estrela removida com sucesso') })
            .catch((err) => {
                alert('Erro ao remover estrela do repositório. Tente novamente com a senha correta')
                this.setState({ passwordLogin: '' })
            })
    }


    starRepo = async (owner, repo) => {
        if (!this.state.passwordLogin) {
            // let password = await prompt('Coloque a sua senha')
            // this.setState({ passwordLogin: password })
            this.setState({openDialog:true})
        }

        // let auth = btoa(this.state.userLogin + ":" + this.state.passwordLogin)

        // api.put(`/user/starred/${owner}/${repo}?client_id=${dataAuth.client_id}&client_secret=${dataAuth.client_secret}`, {}, {
        //     headers: {
        //         'authorization': `Basic ${auth}`,
        //     }
        // })
        //     .then((res) => { this.openSnackbar('Estrela adicionada com sucesso') })
        //     .catch((err) => {
        //         this.openSnackbar('Erro ao adicionar estrela no repositório. Tente novamente com a senha correta')
        //         this.setState({ passwordLogin: '' })
        //     })
    }

    openSnackbar = (message) => {
        this.setState({ snackbaropen: true, snackbarmsg: message })

        setTimeout(() => {
            this.setState({ snackbaropen: false })
        }, 3000)
    }

    handleCloseDialog = (status) => {
        console.log("fechou", this.state.passwordLogin)
        this.setState({openDialog:false})
    }

    handleChangePasswordLogin = event => {
        this.setState({ passwordLogin: event.target.value });
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
                                                    <FaStar /> star
                                                </button>
                                                <button className="btn"
                                                    onClick={() => this.unstarRepo(star.owner.login, star.name)}>
                                                    <FaStar /> unstar
                                                </button>
                                            </footer>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                    <div className="starreds-message">Não há repositórios salvos como estrela para esse usuário.</div>
                                )}

                            {error && <div className="starreds-message">{error}</div>}
                        </div>
                    )}

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                />


                <Dialog open={this.state.openDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Autorização</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Por favor digite a senha do github desse usuário
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Senha"
                            type="password"
                            fullWidth
                            onChange={this.handleChangePasswordLogin}
                            value={this.state.passwordLogin}
                        />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.handleCloseDialog(false)} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={() => this.handleCloseDialog(true)} color="primary">
                                Ok
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }
}
