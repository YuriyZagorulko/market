
const FourOhFour = () => {
  return (
    <div className={'container-404'}>
        <h1 >404 | Page not found</h1>
        <style jsx global>{`
            .container-404{
                font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;
                height: calc(100vh - 300px);
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        `}
        </style>
    </div>
  )
}

export default FourOhFour