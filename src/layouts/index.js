import React from 'react'
import Helmet from 'react-helmet'
import { Link, withPrefix } from 'gatsby-link'
import '../assets/scss/main.scss'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import favicon from '../../public/favicon.ico'

class Template extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isMenuVisible: false,
            loading: 'is-loading',
            scroll: 'top'
        }
        this.handleToggleMenu = this.handleToggleMenu.bind(this)
        // this.pageHeight = this.pageHeight.bind(this)
        // this.headerScroll = this.headerScroll.bind(this)
    }

    componentDidMount () {
        this.timeoutId = setTimeout(() => {
            this.setState({loading: ''});
        }, 100);
    }

    componentWillUnmount () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
        }
    }

    handleToggleMenu() {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        })
    }


    render() {

        const { children } = this.props
        return (
            <div className={`body ${this.state.loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                <Helmet>
                    <link rel="stylesheet" href={withPrefix('skel.css')} />
                    <link rel='icon' href={favicon} type='image/x-icon'/>
                </Helmet>
                <div id="wrapper">
                    <Header onToggleMenu={this.handleToggleMenu} 
                     header={this.state.scroll}
                    />
                    {children()}
                    <Contact />
                    <Footer />
                </div>
                <Menu onToggleMenu={this.handleToggleMenu} />
            </div>
        )
    }
}

Template.propTypes = {
    children: React.PropTypes.func
}

export default Template
