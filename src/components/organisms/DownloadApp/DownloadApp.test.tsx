import { render, screen } from '@testing-library/react'
import DownloadApp from './DownloadApp'

jest.mock(
  '../../../../src/assets/images/AppleStore.svg',
  () => 'AppleStore.svg',
)
jest.mock(
  '../../../../src/assets/images/GoogleStore.svg',
  () => 'GoogleStore.svg',
)

describe('DownloadApp', () => {
  it('renders title correctly', () => {
    render(<DownloadApp />)
    expect(screen.getByText('Descargá la app desde')).toBeInTheDocument()
  })

  it('renders App Store link with image', () => {
    render(<DownloadApp />)
    const appStoreImg = screen.getByAltText('Download on the App Store')
    expect(appStoreImg).toBeInTheDocument()
  })

  it('renders Google Play link with image', () => {
    render(<DownloadApp />)
    const googlePlayImg = screen.getByAltText('Download on Google Play')
    expect(googlePlayImg).toBeInTheDocument()
  })
})
