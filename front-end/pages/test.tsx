import React, { useState } from 'react'
import { connect } from 'react-redux'

const stylingObject = {
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    transition: 'all 1s',
    display: 'flex',
    flexDirection: 'column',
    height: '42px',
    overflow: 'hidden',
    width: '200px;',
    btn: {
        color: '#fff',
        borderColor: '#1890ff',
        border: 'none',
        background: '#1890ff',
        textShadow: '0 -1px 0 rgb(0 0 0 / 12%)',
        boxShadow: '0 2px #0000000b',
        padding: '4px 15px',
        outline: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
}

const openedContainer = {
    backgroundColor: 'rgb(223 233 255)',
    height: '155px',
}

const controlsContainer = {
    paddingTop: '10px',
}

const controlsLine = {
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
}

const controlContainer = {
    width: '50%'
}

const inputStyles = {
    boxSizing: 'border-box',
    margin: '0',
    listStyle: 'none',
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    minWidth: '0',
    padding: '4px 11px',
    color: '#000000d9',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    border: '1px solid #d9d9d9',
    borderRadius: '5px',
    transition: 'all .3s',
    'focusVisible': {
        borderColor: 'var(--ant-primary-color-hover)',
        boxShadow: '0 0 0 2px var(--ant-primary-color-outline)',
        borderRightWidth: '1px',
        outline: '0'
    }
}
const btnDanger = {
    ...stylingObject.btn,
    backgroundColor: '#ff4d4f'
}

function TestPage () {
    const [isOpened, setOpened] = useState(false)
    let containerStyle = { ...stylingObject }
    const onToggleOpen = () => {
        setOpened(!isOpened)
    }
    if (isOpened) {
        containerStyle = {...stylingObject, ...openedContainer}
    }
    return (
        // tslint:disable-next-line: align
        <div style={containerStyle} >
            <button onClick={onToggleOpen} style={stylingObject.btn}>Edit annotation</button>
            <div style={controlsContainer}>
                <div style={controlsLine}>
                    <div style={controlContainer}>
                        <input style={inputStyles} placeholder='X'/>
                    </div>
                    <div style={controlContainer}>
                        <input style={inputStyles} placeholder='Y'/>
                    </div>
                </div>
                <div style={controlsLine}>
                    <div style={controlContainer}>
                        <input style={inputStyles} placeholder='Height'/>
                    </div>
                    <div style={controlContainer}>
                        <input style={inputStyles} placeholder='Width'/>
                    </div>
                </div>
                <div style={controlsLine}>
                    <div style={controlContainer}>
                        <button style={stylingObject.btn}>Save</button>
                    </div>
                    <div style={controlContainer}>
                        <button style={btnDanger}>Cancel</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

const connectedLoginPage = connect(state => state)(TestPage)
export default connectedLoginPage