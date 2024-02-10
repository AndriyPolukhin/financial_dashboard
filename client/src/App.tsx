import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { useMemo } from 'react'
import { themeSettings } from './theme'

const App = () => {
	const theme = useMemo(() => createTheme(themeSettings), [])
	return (
		<>
			<div className='app'>
				<ThemeProvider theme={theme}>
					<CssBaseline />
				</ThemeProvider>
			</div>
		</>
	)
}

export default App
