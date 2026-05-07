import { useState, useMemo } from 'react'
import './App.css'

function App() {
  const [budget, setBudget] = useState('')
  const [homeOdds, setHomeOdds] = useState('')
  const [drawOdds, setDrawOdds] = useState('')
  const [awayOdds, setAwayOdds] = useState('')

  const [errors, setErrors] = useState({})

  const validateAndCalculate = useMemo(() => {
    const b = parseFloat(budget)
    const h = parseFloat(homeOdds)
    const d = parseFloat(drawOdds)
    const a = parseFloat(awayOdds)

    const newErrors = {}

    if (budget && (isNaN(b) || b <= 0)) {
      newErrors.budget = 'Enter a valid amount'
    }
    if (homeOdds && (isNaN(h) || h <= 1)) {
      newErrors.homeOdds = 'Must be greater than 1.00'
    }
    if (drawOdds && (isNaN(d) || d <= 1)) {
      newErrors.drawOdds = 'Must be greater than 1.00'
    }
    if (awayOdds && (isNaN(a) || a <= 1)) {
      newErrors.awayOdds = 'Must be greater than 1.00'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return null
    }

    if (!b || !h || !d || !a) {
      return null
    }

    const homeStake = (b / ((1/h) + (1/d) + (1/a))) * (1/h)
    const drawStake = (b / ((1/h) + (1/d) + (1/a))) * (1/d)
    const awayStake = (b / ((1/h) + (1/d) + (1/a))) * (1/a)

    const homeReturn = homeStake * h
    const drawReturn = drawStake * d
    const awayReturn = awayStake * a

    const minReturn = Math.min(homeReturn, drawReturn, awayReturn)
    const maxReturn = Math.max(homeReturn, drawReturn, awayReturn)
    const loss = b - minReturn
    const lossPercent = (loss / b) * 100

    return {
      homeStake,
      drawStake,
      awayStake,
      homeReturn,
      drawReturn,
      awayReturn,
      minReturn,
      maxReturn,
      loss,
      lossPercent
    }
  }, [budget, homeOdds, drawOdds, awayOdds])

  const handleClear = () => {
    setBudget('')
    setHomeOdds('')
    setDrawOdds('')
    setAwayOdds('')
    setErrors({})
  }

  const hasInput = budget || homeOdds || drawOdds || awayOdds
  const showResults = validateAndCalculate !== null

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">3WaySurebet</h1>
      </header>

      <main className="main">
        <div className="calculator-grid">
          <section className="inputs-panel">
            <h2 className="section-title">Enter your details</h2>

            <div className="input-group">
              <label htmlFor="budget">Total Budget</label>
              <div className="input-with-prefix">
                <span className="prefix">€</span>
                <input
                  id="budget"
                  type="text"
                  inputMode="decimal"
                  placeholder="100"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  aria-describedby={errors.budget ? 'budget-error' : 'budget-helper'}
                  className={errors.budget ? 'error' : ''}
                />
              </div>
              {errors.budget && <span id="budget-error" className="error-message">{errors.budget}</span>}
              {!errors.budget && <span id="budget-helper" className="helper">Amount available to stake across all outcomes</span>}
            </div>

            <div className="odds-grid">
              <div className="input-group">
                <label htmlFor="homeOdds">Home Odds</label>
                <input
                  id="homeOdds"
                  type="text"
                  inputMode="decimal"
                  placeholder="2.50"
                  value={homeOdds}
                  onChange={(e) => setHomeOdds(e.target.value)}
                  aria-describedby={errors.homeOdds ? 'homeOdds-error' : undefined}
                  className={errors.homeOdds ? 'error' : ''}
                />
                {errors.homeOdds && <span id="homeOdds-error" className="error-message">{errors.homeOdds}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="drawOdds">Draw Odds</label>
                <input
                  id="drawOdds"
                  type="text"
                  inputMode="decimal"
                  placeholder="3.20"
                  value={drawOdds}
                  onChange={(e) => setDrawOdds(e.target.value)}
                  aria-describedby={errors.drawOdds ? 'drawOdds-error' : undefined}
                  className={errors.drawOdds ? 'error' : ''}
                />
                {errors.drawOdds && <span id="drawOdds-error" className="error-message">{errors.drawOdds}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="awayOdds">Away Odds</label>
                <input
                  id="awayOdds"
                  type="text"
                  inputMode="decimal"
                  placeholder="2.80"
                  value={awayOdds}
                  onChange={(e) => setAwayOdds(e.target.value)}
                  aria-describedby={errors.awayOdds ? 'awayOdds-error' : undefined}
                  className={errors.awayOdds ? 'error' : ''}
                />
                {errors.awayOdds && <span id="awayOdds-error" className="error-message">{errors.awayOdds}</span>}
              </div>
            </div>

            {hasInput && (
              <button className="btn-ghost clear-btn" onClick={handleClear}>
                Clear all
              </button>
            )}
          </section>

          <section className={`results-panel ${showResults ? 'has-results' : ''}`} aria-live="polite">
            <h2 className="section-title">Your results</h2>

            {!showResults && (
              <div className="empty-state">
                <p>Enter your budget and all three odds to see your optimal stakes.</p>
              </div>
            )}

            

            {showResults && (
              <div className={`results ${showResults ? 'visible' : ''}`}>
                <div className="worst-case">
                  <span className="worst-case-label">Worst case return</span>
                  <span className="worst-case-value tabular-nums">
                    €{validateAndCalculate.minReturn.toFixed(2)}
                  </span>
                  <span className="loss-badge">
                    -€{validateAndCalculate.loss.toFixed(2)} ({validateAndCalculate.lossPercent.toFixed(1)}%)
                  </span>
                </div>

                <div className="returns-grid">
                  <div className="return-item home">
                    <span className="return-label">Home wins</span>
                    <div className="return-details">
                      <span className="return-stake tabular-nums">€{validateAndCalculate.homeStake.toFixed(2)}</span>
                      <span className="return-arrow">→</span>
                      <span className="return-value tabular-nums">€{validateAndCalculate.homeReturn.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="return-item draw">
                    <span className="return-label">Draw</span>
                    <div className="return-details">
                      <span className="return-stake tabular-nums">€{validateAndCalculate.drawStake.toFixed(2)}</span>
                      <span className="return-arrow">→</span>
                      <span className="return-value tabular-nums">€{validateAndCalculate.drawReturn.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="return-item away">
                    <span className="return-label">Away wins</span>
                    <div className="return-details">
                      <span className="return-stake tabular-nums">€{validateAndCalculate.awayStake.toFixed(2)}</span>
                      <span className="return-arrow">→</span>
                      <span className="return-value tabular-nums">€{validateAndCalculate.awayReturn.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="total-staked">
                  <span>Total staked</span>
                  <span className="tabular-nums">€{budget}</span>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default App