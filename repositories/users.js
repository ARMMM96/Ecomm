const fs = require('fs');
const crypto = require('crypto');
class UsersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Create a repository requires a filename');
        }

        this.filename = filename;

        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }

    }

    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));
    }

    async create(attrs) {
        attrs.id = this.randomId();

        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);
    }

    async writeAll(records) {
        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(records, null, 2)
        );
    }

    randomId() {
        return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id == id);
    }


    async delete(id) {
        const records = await this.getAll();
        const fitleredRecords = records.filter(record => record.id !== id);
        await this.writeAll(fitleredRecords);
    }

    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);

        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }

        Object.assign(record, attrs);
        await this.writeAll(records);

    }
}

const test = async () => {

    const repo = new UsersRepository('users.json');

    await repo.update('96498ui', { password: 'myPassword' });
};

test();