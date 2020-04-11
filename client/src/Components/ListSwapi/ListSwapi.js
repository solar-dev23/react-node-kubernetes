import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import DataTable from 'react-data-table-component';

import PageLoader from '../PageLoader/PageLoader';
import { peopleListApi } from '../../utils/APICalls';

import './ListSwapi.css';

const ListSwapi = () => {

	const [loading, setLoading] = useState(true);
	const columns = [
		{
			name: 'Groups',
			selector: 'group',
			cell: row => {
				let valueStr = row.value + ' - Group';
				return (
					<React.Fragment>{valueStr}</React.Fragment>
				)				
			}
		}
	];

	const [tableData, setTableData] = useState([]);
	const [groupData, setGroupData] = useState([]);

	useEffect(() => {
		peopleListApi()
			.then(res => {				
				setLoading(false);
				setTableData(res);
				groupByValue(res);
			})
			.catch(error => {
				setLoading(false);
			})				
	}, [])

	const groupByValue = data => {
		let uniqueValue = [];
		data.forEach(item => {
			if (uniqueValue.filter(itemFilter => itemFilter.value === item.value).length === 0){
				uniqueValue.push({
					value: item.value,
					ids:[item.id]
				});
			} else {
				uniqueValue = uniqueValue.map(itemOne => {
					if (itemOne.value === item.value)
						return {
							...itemOne,
							ids:[...itemOne.ids, item.id].sort()
						} 
					else return itemOne
				})
			}
		})

		setGroupData([ ...uniqueValue]);
	}

	return (
		<MDBContainer className="swapi-table-main" >
			<MDBRow>
				<MDBCol>
					{loading ? (
							<PageLoader />
						) : (
							<DataTable
								className="custom-table"
								columns={columns}
								data={groupData}
								pagination={true}
								expandableRows
								expandableRowsComponent={<ExpandableRowsComponent tabelData={tableData} />}
							/>
						)
					}						
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
};

const ExpandableRowsComponent = (props) => {	

	const columns = [
		{
			name: 'Id',
			selector: 'id',
			sortable: true,
		},
		{
			name: 'Value',
			selector: 'value',
			sortable: true,
		}	
	];

	return (
		<MDBRow className="expand-table-container custom-table">
			<MDBCol md="1"></MDBCol>
			<MDBCol md="10">
				<DataTable
					columns={columns}
					data={props.tabelData.filter(item => item.value === props.data.value)}
					pagination={true}
				/>
			</MDBCol>
		</MDBRow>
	)
}

export default ListSwapi;