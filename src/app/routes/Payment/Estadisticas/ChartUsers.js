import React, { Component } from 'react';
import { Bar, Line, Pie } from "react-chartjs-2";
//Components
import Spinner from "components/Spinner/Spinner";

const ChartUsers = ({ resultados_users }) => {
    const { meses, resultados } = resultados_users;
    if (!meses || !resultados) return <Spinner />

    const mesesAnio = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    return (
        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="jr-card jr-card-widget jr-card-ticketlist card">
                <div className="d-flex flex-row mb-3">
                    <h4 className="mb-1">Usuarios registros en los últimos 6 meses</h4>
                </div>
                <div className="chart">
                    <Bar
                        data={{
                            labels: [mesesAnio[meses[0]], mesesAnio[meses[1]], mesesAnio[meses[2]], mesesAnio[meses[3]], mesesAnio[meses[4]], mesesAnio[meses[5]]],
                            datasets: [{
                                label: '# Nuevos Usuarios',
                                data: resultados,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        }}
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChartUsers;