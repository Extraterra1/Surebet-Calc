import { useState, useEffect, useMemo } from 'react'
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

    const inverseSum = (1/h) + (1/d) + (1/a)

    if (inverseSum >= 1) {
      return {
        error: 'No profitable surebet exists with these odds',
        isArbitrage: true
      }
    }

    const guaranteedReturn = b / inverseSum
    const homeStake = guaranteedReturn / h
    const drawStake = guaranteedReturn / d
    const awayStake = guaranteedReturn / a

    const profit = guaranteedReturn - b
    const profitPercent = (profit / b) * 100

    return {
      homeStake,
      drawStake,
      awayStake,
      guaranteedReturn,
      profit,
      profitPercent,
      totalStake: homeStake + drawStake + awayStake
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
  const showResults = validateAndCalculate && !validateAndCalculate.error

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
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="100"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={errors.budget ? 'error' : ''}
                />
              </div>
              {errors.budget && <span className="error-message">{errors.budget}</span>}
              <span className="helper">Amount available to stake across all outcomes</span>
            </div>

            <div className="odds-grid">
              <div className="input-group">
                <label htmlFor="homeOdds">Home Odds</label>
                <input
                  id="homeOdds"
                  type="number"
                  step="0.01"
                  min="1.01"
                  placeholder="2.50"
                  value={homeOdds}
                  onChange={(e) => setHomeOdds(e.target.value)}
                  className={errors.homeOdds ? 'error' : ''}
                />
                {errors.homeOdds && <span className="error-message">{errors.homeOdds}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="drawOdds">Draw Odds</label>
                <input
                  id="drawOdds"
                  type="number"
                  step="0.01"
                  min="1.01"
                  placeholder="3.20"
                  value={drawOdds}
                  onChange={(e) => setDrawOdds(e.target.value)}
                  className={errors.drawOdds ? 'error' : ''}
                />
                {errors.drawOdds && <span className="error-message">{errors.drawOdds}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="awayOdds">Away Odds</label>
                <input
                  id="awayOdds"
                  type="number"
                  step="0.01"
                  min="1.01"
                  placeholder="2.80"
                  value={awayOdds}
                  onChange={(e) => setAwayOdds(e.target.value)}
                  className={errors.awayOdds ? 'error' : ''}
                />
                {errors.awayOdds && <span className="error-message">{errors.awayOdds}</span>}
              </div>
            </div>

            {hasInput && (
              <button className="btn-ghost clear-btn" onClick={handleClear}>
                Clear all
              </button>
            )}
          </section>

          <section className={`results-panel ${showResults ? 'has-results' : ''}`}>
            <h2 className="section-title">Your results</h2>

            {!showResults && !validateAndCalculate?.error && (
              <div className="empty-state">
                <p>Enter your budget and all three odds to see your optimal stakes.</p>
              </div>
            )}

            {validateAndCalculate?.error && (
              <div className="error-state">
                <p>{validateAndCalculate.error}</p>
                <span className="helper">Odds must imply less than 100% probability for a surebet.</span>
              </div>
            )}

            {showResults && (
              <div className="results">
                <div className="guaranteed-return">
                  <span className="guaranteed-label">Guaranteed return</span>
                  <span className="guaranteed-value tabular-nums">
                    €{validateAndCalculate.guaranteedReturn.toFixed(2)}
                  </span>
                  <span className="profit-badge">
                    +€{validateAndCalculate.profit.toFixed(2)} ({validateAndCalculate.profitPercent.toFixed(1)}%)
                  </span>
                </div>

                <div className="stakes-grid">
                  <div className="stake-item">
                    <span className="stake-label">Home stake</span>
                    <span className="stake-value tabular-nums">
                      €{validateAndCalculate.homeStake.toFixed(2)}
                    </span>
                  </div>
                  <div className="stake-item">
                    <span className="stake-label">Draw stake</span>
                    <span className="stake-value tabular-nums">
                      €{validateAndCalculate.drawStake.toFixed(2)}
                    </span>
                  </div>
                  <div className="stake-item">
                    <span className="stake-label">Away stake</span>
                    <span className="stake-value tabular-nums">
                      €{validateAndCalculate.awayStake.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="total-staked">
                  <span>Total staked</span>
                  <span className="tabular-nums">€{validateAndCalculate.totalStake.toFixed(2)}</span>
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