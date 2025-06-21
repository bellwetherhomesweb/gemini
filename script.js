        document.addEventListener('DOMContentLoaded', () => {
            const initialChoiceSection = document.getElementById('initial-choice');
            const investorJourneySection = document.getElementById('investor-journey');
            const hoaJourneySection = document.getElementById('hoa-journey');
            const backButtonContainer = document.getElementById('back-button-container');

            const selectInvestorBtn = document.getElementById('select-investor');
            const selectHoaBtn = document.getElementById('select-hoa');
            const backToChoiceBtn = document.getElementById('back-to-choice');
            
            const emergingInvestorCard = document.getElementById('emerging-investor-card');
            const institutionalStrategistCard = document.getElementById('institutional-strategist-card');
            const investorToolSection = document.getElementById('investor-tool-section');
            const investorToolTitle = document.getElementById('investor-tool-title');
            const investorToolContent = document.getElementById('investor-tool-content');

            let investorChart = null;
            let hoaChart = null;

            // HOA Assessment Tool Elements
            const quizContainer = document.getElementById('quiz-container');
            const showResultsBtn = document.getElementById('show-results-btn');
            const resultsContainer = document.getElementById('results-container');
            const riskScoreEl = document.getElementById('risk-score');
            const riskSummaryEl = document.getElementById('risk-summary');
            const leadCaptureForm = document.getElementById('lead-capture-form');
            const leadEmailInput = document.getElementById('lead-email');

            const quizAnswers = {};

            function checkQuizCompletion() {
                const completed = Object.keys(quizAnswers).length === 3;
                showResultsBtn.disabled = !completed;
            }

            quizContainer.addEventListener('click', (e) => {
                const option = e.target.closest('.quiz-option');
                if (!option) return;

                const questionContainer = e.target.closest('[data-question]');
                const questionNumber = questionContainer.dataset.question;
                const score = option.dataset.score;
                const text = option.textContent;

                quizAnswers[questionNumber] = { score: parseInt(score), text: text };

                // Update UI
                questionContainer.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                checkQuizCompletion();
            });
            
            showResultsBtn.addEventListener('click', () => {
                let totalScore = 0;
                Object.values(quizAnswers).forEach(answer => {
                    totalScore += answer.score;
                });

                let summaryText = '';
                if (totalScore >= 25) {
                    summaryText = "Excellent! Your board appears to have strong operational health and low immediate risk.";
                    riskScoreEl.style.color = '#0d9488';
                } else if (totalScore >= 15) {
                    summaryText = "Good, but with room for improvement. Your board has some solid practices but may have moderate risk in key areas.";
                    riskScoreEl.style.color = '#f59e0b';
                } else {
                    summaryText = "High Risk Alert! Your board's current practices may expose the association to significant financial and legal risk.";
                    riskScoreEl.style.color = '#dc2626';
                }
                
                riskScoreEl.textContent = `${totalScore}/30`;
                riskSummaryEl.textContent = summaryText;

                quizContainer.classList.add('hidden');
                resultsContainer.classList.remove('hidden');
                resultsContainer.classList.add('fade-in');
                resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
            
            leadCaptureForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = leadEmailInput.value;
                const subject = "HOA Board Health Assessment Results";
                let body = "Here are the results from my HOA Board Health & Risk Assessment:\n\n";
                body += `Overall Score: ${riskScoreEl.textContent}\n`;
                body += `Summary: ${riskSummaryEl.textContent}\n\n`;
                body += "Assessment Details:\n";
                body += `1. Reserve Study: ${quizAnswers['1'].text}\n`;
                body += `2. Rule Enforcement: ${quizAnswers['2'].text}\n`;
                body += `3. Meeting Minutes: ${quizAnswers['3'].text}\n\n`;
                body += "Please send me my detailed, actionable report.";
                
                window.location.href = `mailto:sales@yourcompany.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            });


            const investorTools = {
                emerging: {
                    title: "Essential Tool: First Deal Red Flag Analyzer",
                    content: `<p class="text-slate-700 mb-4">This checklist-based wizard helps you combat the "snowball effect" that plagues new investors. Input key details of a potential property (age, construction, deferred maintenance) and the tool generates a "Risk Score" with clear explanations, highlighting hidden costs and operational challenges.</p>
                              <p class="font-semibold text-sky-800">This transforms our site from an information provider into your strategic due diligence partner, helping you avoid a disastrous first deal.</p>`
                },
                institutional: {
                    title: "Essential Tool: Value-Add ROI Modeler",
                    content: `<p class="text-slate-700 mb-4">A sophisticated tool for portfolio managers to model the financial impact of renovation scenarios. Input costs for different upgrade packages, projected rent premiums, and market cap rates. The modeler outputs a comprehensive pro forma, projecting the impact on NOI, cash-on-cash return, and total asset value.</p>
                              <p class="font-semibold text-sky-800">This provides the quantitative justification required for high-stakes capital allocation decisions.</p>`
                }
            };
            
            function showInvestorTool(type) {
                investorToolTitle.innerHTML = investorTools[type].title;
                investorToolContent.innerHTML = investorTools[type].content;
                investorToolSection.classList.remove('hidden');
                investorToolSection.classList.add('fade-in');
                 investorToolSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            emergingInvestorCard.addEventListener('click', () => {
                emergingInvestorCard.classList.add('border-sky-500', 'scale-105');
                institutionalStrategistCard.classList.remove('border-sky-500', 'scale-105');
                showInvestorTool('emerging');
            });
            
            institutionalStrategistCard.addEventListener('click', () => {
                institutionalStrategistCard.classList.add('border-sky-500', 'scale-105');
                emergingInvestorCard.classList.remove('border-sky-500', 'scale-105');
                showInvestorTool('institutional');
            });

            const switchView = (showSection) => {
                initialChoiceSection.classList.add('fade-out');
                setTimeout(() => {
                    initialChoiceSection.classList.add('hidden');
                    initialChoiceSection.classList.remove('fade-out');
                    
                    backButtonContainer.classList.remove('hidden');
                    backButtonContainer.classList.add('fade-in');

                    if (showSection === 'investor') {
                        investorJourneySection.classList.remove('hidden');
                        investorJourneySection.classList.add('fade-in');
                        renderInvestorChart();
                    } else if (showSection === 'hoa') {
                        hoaJourneySection.classList.remove('hidden');
                        hoaJourneySection.classList.add('fade-in');
                        renderHoaChart();
                        checkQuizCompletion();
                    }
                }, 500);
            };

            const resetView = () => {
                investorJourneySection.classList.add('fade-out');
                hoaJourneySection.classList.add('fade-out');
                backButtonContainer.classList.add('fade-out');

                setTimeout(() => {
                    investorJourneySection.classList.add('hidden');
                    hoaJourneySection.classList.add('hidden');
                    backButtonContainer.classList.add('hidden');

                    investorJourneySection.classList.remove('fade-out');
                    hoaJourneySection.classList.remove('fade-out');
                    backButtonContainer.classList.remove('fade-out');
                    
                    initialChoiceSection.classList.remove('hidden');
                    initialChoiceSection.classList.add('fade-in');

                    investorToolSection.classList.add('hidden');
                    emergingInvestorCard.classList.remove('border-sky-500', 'scale-105');
                    institutionalStrategistCard.classList.remove('border-sky-500', 'scale-105');
                    
                    // Reset quiz
                    resultsContainer.classList.add('hidden');
                    quizContainer.classList.remove('hidden');
                    Object.keys(quizAnswers).forEach(key => delete quizAnswers[key]);
                    document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
                    leadEmailInput.value = '';
                    checkQuizCompletion();


                }, 500);
            };

            selectInvestorBtn.addEventListener('click', () => switchView('investor'));
            selectHoaBtn.addEventListener('click', () => switchView('hoa'));
            backToChoiceBtn.addEventListener('click', resetView);

            function renderInvestorChart() {
                if (investorChart) {
                    investorChart.destroy();
                }
                const ctx = document.getElementById('investorComparisonChart').getContext('2d');
                investorChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Risk Profile', 'Operational Focus', 'Capital Source', 'Decision Driver'],
                        datasets: [
                            {
                                label: 'Emerging Investor',
                                data: [90, 80, 70, 75],
                                backgroundColor: 'rgba(14, 116, 144, 0.7)',
                                borderColor: 'rgba(14, 116, 144, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Institutional Strategist',
                                data: [40, 30, 20, 25],
                                backgroundColor: 'rgba(56, 189, 248, 0.7)',
                                borderColor: 'rgba(56, 189, 248, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                beginAtZero: true,
                                max: 100,
                                ticks: { display: false },
                                grid: { display: false },
                                title: { display: true, text: 'Tactical/Personal Focus -> Strategic/Portfolio Focus' }
                            },
                             y: { grid: { display: false } }
                        },
                        plugins: {
                            legend: { position: 'bottom' },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) { label += ': '; }
                                        const val = context.raw;
                                        const category = context.label;
                                        if (category === 'Risk Profile') label += (val > 50 ? 'High Personal Risk' : 'Managed/Diversified');
                                        if (category === 'Operational Focus') label += (val > 50 ? 'Hands-On/Tactical' : 'Oversight/Strategic');
                                        if (category === 'Capital Source') label += (val > 50 ? 'Personal/Creative' : 'Institutional');
                                        if (category === 'Decision Driver') label += (val > 50 ? 'Cash Flow/Survival' : 'Risk-Adjusted Returns');
                                        return label;
                                    }
                                }
                            }
                        }
                    }
                });
            }

            function renderHoaChart() {
                if (hoaChart) {
                    hoaChart.destroy();
                }
                const hoaSolutionPanel = document.getElementById('hoa-solution-panel');
                const hoaSolutionTitle = document.getElementById('hoa-solution-title');
                const hoaSolutionText = document.getElementById('hoa-solution-text');
                const responsibilities = {
                    'Ensuring Compliance': {
                        text: "Fulfilling your role with integrity starts here. Our 'Governance & Compliance' module provides plain-English guides on your duties and state-specific laws, giving you a clear, compliant path forward and peace of mind.",
                    },
                    'Fiscal Stewardship': {
                        text: "Being a responsible steward of your community's funds is a vital role. Our 'Financial Stewardship' module offers interactive budget templates and simple guides to reserve planning, empowering you to manage your association's finances with clarity and foresight.",
                    },
                    'Fostering Harmony': {
                        text: "Building a strong community involves navigating disagreements constructively. Our 'Community Harmony' hub provides frameworks for fair, consistent rule application and communication templates to help you resolve issues respectfully.",
                    },
                    'Sustainable Service': {
                        text: "Your contribution is valuable, and your time is precious. We provide tools to streamline your work, from meeting agenda generators to guides on effective delegation, helping you serve your community effectively without sacrificing your personal life.",
                    },
                    'Building Confidence': {
                        text: "Every great leader starts somewhere. The entire OS is designed as your on-demand guide, providing the foundational knowledge you need for every aspect of your role, empowering you to make informed decisions for your community.",
                    }
                };

                const ctx = document.getElementById('hoaPainPointChart').getContext('2d');
                hoaChart = new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: Object.keys(responsibilities),
                        datasets: [{
                            label: 'Area of Focus',
                            data: [90, 85, 75, 80, 95],
                            fill: true,
                            backgroundColor: 'rgba(13, 148, 136, 0.2)',
                            borderColor: 'rgb(13, 148, 136)',
                            pointBackgroundColor: 'rgb(13, 148, 136)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(13, 148, 136)'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        elements: {
                            line: {
                                borderWidth: 3
                            }
                        },
                        scales: {
                            r: {
                                angleLines: { display: false },
                                suggestedMin: 0,
                                suggestedMax: 100,
                                pointLabels: {
                                    font: { size: 12, weight: '500' },
                                    color: '#334155'
                                },
                                ticks: { display: false }
                            }
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false }
                        },
                        onClick: (e, elements) => {
                            if (elements.length > 0) {
                                const elementIndex = elements[0].index;
                                const label = hoaChart.data.labels[elementIndex];
                                
                                hoaSolutionPanel.classList.remove('fade-in');
                                setTimeout(() => {
                                   hoaSolutionTitle.textContent = `Guidance for: ${label}`;
                                   hoaSolutionText.textContent = responsibilities[label].text;
                                   hoaSolutionPanel.classList.add('fade-in');
                                   hoaSolutionPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }, 150);
                            }
                        },
                        onHover: (e, elements) => {
                           e.native.target.style.cursor = elements[0] ? 'pointer' : 'default';
                        }
                    }
                });
            }
        });
