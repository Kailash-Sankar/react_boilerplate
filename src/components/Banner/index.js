import React from "react"
import PropTypes from "prop-types"
import styles from './banner.module.less'


function Banner({text}) {
    return (
    <>
    <div className={styles.banner}>{text}</div>
    </>
    );
}

Banner.propTypes = {
    text: PropTypes.string
}

Banner.defaultProps = {
    text: ''
}

export default Banner;