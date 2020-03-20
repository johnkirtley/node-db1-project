const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
	db.select('*')
		.from('accounts')
		.then(rows => {
			if (rows.length > 0) {
				res.status(201).json({ data: rows });
			} else {
				res.status(404).json({ message: 'Please add accounts' });
			}
		})
		.catch(err => {
			console.log('Could not get accounts', err);
		});
});

router.get('/:id', (req, res) => {
	db('accounts')
		.where({ id: req.params.id })
		.first()
		.then(row => {
			if (row) {
				res.status(201).json({ message: row });
			} else {
				res.status(404).json({ message: 'Could not find account' });
			}
		})
		.catch(err => {
			console.log('Error finding ID', err);
		});
});

router.post('/', (req, res) => {
	db('accounts')
		.insert(req.body, 'id')
		.into('accounts')
		.then(count => {
			if (count > 0) {
				res.status(201).json({ data: 'Posted' });
			} else {
				res.status(404).json({ message: 'Error posting account' });
			}
		})
		.catch(err => {
			console.log('Error posting account', err);
		});
});

router.put('/:id', (req, res) => {
	db('accounts')
		.where({ id: req.params.id })
		.update(req.body)
		.then(count => {
			if (count > 0) {
				res.status(201).json({ data: 'Updated' });
			} else {
				res.status(404).json({ message: 'Error updating account' });
			}
		})
		.catch(err => {
			console.log('Error updating', err);
		});
});

router.delete('/:id', (req, res) => {
	db('accounts')
		.where({ id: req.params.id })
		.delete()
		.then(count => {
			if (count > 0) {
				res.status(201).json({ message: 'Record deleted' });
			} else {
				res.status(404).json({ message: 'Could not delete' });
			}
		})
		.catch(err => {
			console.log('Error deleting', err);
		});
});

module.exports = router;
