import { useState } from 'react';
import { industryProblems } from '../data/industryProblems';
import './IndustryForm.css';

function IndustryForm() {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [showResults, setShowResults] = useState(false);

  const industries = Object.keys(industryProblems);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIndustry) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedIndustry('');
    setShowResults(false);
  };

  const problems = selectedIndustry ? industryProblems[selectedIndustry] : [];

  return (
    <div className="industry-form-container">
      <div className="form-card">
        <h1>Analiza problemów sprzedażowych</h1>
        <p className="subtitle">Wybierz branżę, aby poznać typowe problemy sprzedażowe</p>

        <form onSubmit={handleSubmit} className="industry-form">
          <div className="form-group">
            <label htmlFor="industry-select">
              Branża firmy:
            </label>
            <select
              id="industry-select"
              value={selectedIndustry}
              onChange={(e) => {
                setSelectedIndustry(e.target.value);
                setShowResults(false);
              }}
              required
            >
              <option value="">-- Wybierz branżę --</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="btn-submit" disabled={!selectedIndustry}>
              Pokaż problemy
            </button>
            {selectedIndustry && (
              <button type="button" className="btn-reset" onClick={handleReset}>
                Wyczyść
              </button>
            )}
          </div>
        </form>

        {showResults && problems.length > 0 && (
          <div className="results-container">
            <h2>Typowe problemy sprzedażowe w branży: {selectedIndustry}</h2>
            <ul className="problems-list">
              {problems.map((problem, index) => (
                <li key={index} className="problem-item">
                  <span className="problem-number">{index + 1}</span>
                  <span className="problem-text">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default IndustryForm;
