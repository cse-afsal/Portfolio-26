import Game from './components/Game'
import HUD from './ui/HUD'

export default function App() {
  return (
    <div className="w-full h-full relative">
      <Game />
      <HUD />
    </div>
  )
}
