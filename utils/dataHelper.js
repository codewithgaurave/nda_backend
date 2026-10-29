const mongoose = require('mongoose');
const Course = require('../models/Course');
const Enquiry = require('../models/Enquiry');
const Notice = require('../models/Notice');
const Blog = require('../models/Blog');
const Gallery = require('../models/Gallery');
const Candidate = require('../models/Candidate');
const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
const { getIsMongoConnected, readLocalStore, writeLocalStore } = require('../config/db');

// Helper to interact with DB or local store seamlessly
const dataService = {
  // --- COURSES ---
  async getCourses() {
    if (getIsMongoConnected()) {
      return await Course.find().sort({ createdAt: -1 });
    }
    const store = readLocalStore();
    return store.courses || [];
  },

  async getCourseById(id) {
    if (getIsMongoConnected()) {
      return await Course.findById(id);
    }
    const store = readLocalStore();
    return (store.courses || []).find(c => c._id === id || c.code === id);
  },

  async createCourse(data) {
    if (getIsMongoConnected()) {
      return await Course.create(data);
    }
    const store = readLocalStore();
    const newCourse = { ...data, _id: 'c_' + Date.now(), createdAt: new Date().toISOString() };
    store.courses.unshift(newCourse);
    writeLocalStore(store);
    return newCourse;
  },

  async updateCourse(id, data) {
    if (getIsMongoConnected()) {
      return await Course.findByIdAndUpdate(id, data, { new: true });
    }
    const store = readLocalStore();
    const idx = store.courses.findIndex(c => c._id === id);
    if (idx !== -1) {
      store.courses[idx] = { ...store.courses[idx], ...data, updatedAt: new Date().toISOString() };
      writeLocalStore(store);
      return store.courses[idx];
    }
    return null;
  },

  async deleteCourse(id) {
    if (getIsMongoConnected()) {
      return await Course.findByIdAndDelete(id);
    }
    const store = readLocalStore();
    const idx = store.courses.findIndex(c => c._id === id);
    if (idx !== -1) {
      const removed = store.courses.splice(idx, 1);
      writeLocalStore(store);
      return removed[0];
    }
    return null;
  },

  // --- ENQUIRIES ---
  async getEnquiries(filter = {}) {
    if (getIsMongoConnected()) {
      const query = {};
      if (filter.status && filter.status !== 'All') query.status = filter.status;
      if (filter.course && filter.course !== 'All') query.courseInterested = filter.course;
      return await Enquiry.find(query).sort({ createdAt: -1 });
    }
    const store = readLocalStore();
    let list = store.enquiries || [];
    if (filter.status && filter.status !== 'All') {
      list = list.filter(e => e.status === filter.status);
    }
    if (filter.course && filter.course !== 'All') {
      list = list.filter(e => e.courseInterested === filter.course);
    }
    return list;
  },

  async createEnquiry(data) {
    if (getIsMongoConnected()) {
      return await Enquiry.create(data);
    }
    const store = readLocalStore();
    const newEnquiry = { ...data, _id: 'e_' + Date.now(), status: 'Pending', createdAt: new Date().toISOString() };
    store.enquiries.unshift(newEnquiry);
    writeLocalStore(store);
    return newEnquiry;
  },

  async updateEnquiry(id, data) {
    if (getIsMongoConnected()) {
      return await Enquiry.findByIdAndUpdate(id, data, { new: true });
    }
    const store = readLocalStore();
    const idx = store.enquiries.findIndex(e => e._id === id);
    if (idx !== -1) {
      store.enquiries[idx] = { ...store.enquiries[idx], ...data, updatedAt: new Date().toISOString() };
      writeLocalStore(store);
      return store.enquiries[idx];
    }
    return null;
  },

  async deleteEnquiry(id) {
    if (getIsMongoConnected()) {
      return await Enquiry.findByIdAndDelete(id);
    }
    const store = readLocalStore();
    const idx = store.enquiries.findIndex(e => e._id === id);
    if (idx !== -1) {
      const removed = store.enquiries.splice(idx, 1);
      writeLocalStore(store);
      return removed[0];
    }
    return null;
  },

  // --- NOTICES ---
  async getNotices() {
    if (getIsMongoConnected()) {
      return await Notice.find({ isActive: true }).sort({ createdAt: -1 });
    }
    const store = readLocalStore();
    return store.notices || [];
  },

  async getAllNoticesAdmin() {
    if (getIsMongoConnected()) {
      return await Notice.find().sort({ createdAt: -1 });
    }
    const store = readLocalStore();
    return store.notices || [];
  },

  async createNotice(data) {
    if (getIsMongoConnected()) {
      return await Notice.create(data);
    }
    const store = readLocalStore();
    const newNotice = { ...data, _id: 'n_' + Date.now(), createdAt: new Date().toISOString() };
    store.notices.unshift(newNotice);
    writeLocalStore(store);
    return newNotice;
  },

  async updateNotice(id, data) {
    if (getIsMongoConnected()) {
      return await Notice.findByIdAndUpdate(id, data, { new: true });
    }
    const store = readLocalStore();
    const idx = store.notices.findIndex(n => n._id === id);
    if (idx !== -1) {
      store.notices[idx] = { ...store.notices[idx], ...data, updatedAt: new Date().toISOString() };
      writeLocalStore(store);
      return store.notices[idx];
    }
    return null;
  },

  async deleteNotice(id) {
    if (getIsMongoConnected()) {
      return await Notice.findByIdAndDelete(id);
    }
    const store = readLocalStore();
    const idx = store.notices.findIndex(n => n._id === id);
    if (idx !== -1) {
      const removed = store.notices.splice(idx, 1);
      writeLocalStore(store);
      return removed[0];
    }
    return null;
  },

  // --- BLOGS ---
  async getBlogs() {
    if (getIsMongoConnected()) {
      return await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    }
    const store = readLocalStore();
    return (store.blogs || []).filter(b => b.isPublished !== false);
  },

  async getAllBlogsAdmin() {
    if (getIsMongoConnected()) {
      return await Blog.find().sort({ createdAt: -1 });
    }
    const store = readLocalStore();
    return store.blogs || [];
  },

  async getBlogBySlug(slug, incrementView = false) {
    if (getIsMongoConnected()) {
      const isObjectId = mongoose.isValidObjectId(slug);
      let blog = null;
      if (isObjectId) {
        blog = await Blog.findOne({ $or: [{ slug }, { _id: slug }] });
      }
      if (!blog) {
        blog = await Blog.findOne({ slug: new RegExp(`^${slug}$`, 'i') });
      }
      if (!blog) {
        const cleaned = slug.replace(/[-_]?blog$/i, '');
        if (cleaned && cleaned !== slug) {
          blog = await Blog.findOne({ slug: new RegExp(`^${cleaned}$`, 'i') });
        }
      }
      if (blog && incrementView) {
        blog.views = (blog.views || 0) + 1;
        await blog.save();
      }
      return blog;
    }
    const store = readLocalStore();
    const cleanLower = slug.toLowerCase();
    const blog = (store.blogs || []).find(b => 
      b.slug === slug || 
      b._id === slug || 
      (b.slug && b.slug.toLowerCase() === cleanLower) ||
      (b.slug && cleanLower.startsWith(b.slug.toLowerCase()))
    );
    if (blog && incrementView) {
      blog.views = (blog.views || 0) + 1;
      writeLocalStore(store);
    }
    return blog;
  },

  async incrementBlogShare(idOrSlug) {
    if (getIsMongoConnected()) {
      const blog = await Blog.findOne({ $or: [{ _id: idOrSlug }, { slug: idOrSlug }] });
      if (blog) {
        blog.shares = (blog.shares || 0) + 1;
        await blog.save();
        return blog;
      }
      return null;
    }
    const store = readLocalStore();
    const blog = (store.blogs || []).find(b => b._id === idOrSlug || b.slug === idOrSlug);
    if (blog) {
      blog.shares = (blog.shares || 0) + 1;
      writeLocalStore(store);
      return blog;
    }
    return null;
  },

  async createBlog(data) {
    if (getIsMongoConnected()) {
      return await Blog.create({ ...data, views: data.views || 0, shares: data.shares || 0 });
    }
    const store = readLocalStore();
    const newBlog = {
      ...data,
      views: data.views || 0,
      shares: data.shares || 0,
      _id: 'b_' + Date.now(),
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      createdAt: new Date().toISOString()
    };
    store.blogs.unshift(newBlog);
    writeLocalStore(store);
    return newBlog;
  },

  async updateBlog(id, data) {
    if (getIsMongoConnected()) {
      return await Blog.findByIdAndUpdate(id, data, { new: true });
    }
    const store = readLocalStore();
    const idx = store.blogs.findIndex(b => b._id === id);
    if (idx !== -1) {
      store.blogs[idx] = { ...store.blogs[idx], ...data, updatedAt: new Date().toISOString() };
      writeLocalStore(store);
      return store.blogs[idx];
    }
    return null;
  },

  async deleteBlog(id) {
    if (getIsMongoConnected()) {
      return await Blog.findByIdAndDelete(id);
    }
    const store = readLocalStore();
    const idx = store.blogs.findIndex(b => b._id === id);
    if (idx !== -1) {
      const removed = store.blogs.splice(idx, 1);
      writeLocalStore(store);
      return removed[0];
    }
    return null;
  },

  // --- GALLERY ---
  async getGallery(category) {
    if (getIsMongoConnected()) {
      const q = category && category !== 'All' ? { category } : {};
      return await Gallery.find(q).sort({ createdAt: -1 });
    }
    const store = readLocalStore();
    let list = store.gallery || [];
    if (category && category !== 'All') {
      list = list.filter(g => g.category === category);
    }
    return list;
  },

  async createGalleryItem(data) {
    if (getIsMongoConnected()) {
      return await Gallery.create(data);
    }
    const store = readLocalStore();
    const newItem = { ...data, _id: 'g_' + Date.now(), createdAt: new Date().toISOString() };
    store.gallery.unshift(newItem);
    writeLocalStore(store);
    return newItem;
  },

  async deleteGalleryItem(id) {
    if (getIsMongoConnected()) {
      return await Gallery.findByIdAndDelete(id);
    }
    const store = readLocalStore();
    const idx = store.gallery.findIndex(g => g._id === id);
    if (idx !== -1) {
      const removed = store.gallery.splice(idx, 1);
      writeLocalStore(store);
      return removed[0];
    }
    return null;
  },

  // --- ADMIN AUTH ---
  async findAdminByEmail(email) {
    const cleanEmail = email.toLowerCase().trim();
    if (getIsMongoConnected()) {
      return await Admin.findOne({ email: cleanEmail });
    }
    const store = readLocalStore();
    return (store.admins || []).find(a => a.email.toLowerCase() === cleanEmail);
  },

  // --- CONTACTS ---
  async getContacts(filter = {}) {
    if (getIsMongoConnected()) {
      const query = {};
      if (filter.status && filter.status !== 'All') query.status = filter.status;
      if (filter.course && filter.course !== 'All') query.course = filter.course;
      return await Contact.find(query).sort({ createdAt: -1 });
    }
    const store = readLocalStore();
    let list = store.contacts || [];
    if (filter.status && filter.status !== 'All') {
      list = list.filter(c => c.status === filter.status);
    }
    if (filter.course && filter.course !== 'All') {
      list = list.filter(c => c.course === filter.course);
    }
    return list;
  },

  async createContact(data) {
    if (getIsMongoConnected()) {
      return await Contact.create(data);
    }
    const store = readLocalStore();
    if (!store.contacts) store.contacts = [];
    const newContact = {
      ...data,
      _id: 'con_' + Date.now(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    store.contacts.unshift(newContact);
    writeLocalStore(store);
    return newContact;
  },

  async updateContact(id, data) {
    if (getIsMongoConnected()) {
      return await Contact.findByIdAndUpdate(id, data, { new: true });
    }
    const store = readLocalStore();
    if (!store.contacts) store.contacts = [];
    const idx = store.contacts.findIndex(c => c._id === id);
    if (idx !== -1) {
      store.contacts[idx] = { ...store.contacts[idx], ...data, updatedAt: new Date().toISOString() };
      writeLocalStore(store);
      return store.contacts[idx];
    }
    return null;
  },

  async deleteContact(id) {
    if (getIsMongoConnected()) {
      return await Contact.findByIdAndDelete(id);
    }
    const store = readLocalStore();
    if (!store.contacts) store.contacts = [];
    const idx = store.contacts.findIndex(c => c._id === id);
    if (idx !== -1) {
      const removed = store.contacts.splice(idx, 1);
      writeLocalStore(store);
      return removed[0];
    }
    return null;
  },

  // --- CANDIDATES / SELECTIONS ---
  async getCandidates() {
    if (getIsMongoConnected()) {
      return await Candidate.find().sort({ createdAt: -1 });
    }
    const store = readLocalStore();
    return store.candidates || [];
  },

  async createCandidate(data) {
    if (getIsMongoConnected()) {
      return await Candidate.create(data);
    }
    const store = readLocalStore();
    if (!store.candidates) store.candidates = [];
    const newCandidate = { ...data, _id: 'cand_' + Date.now(), createdAt: new Date().toISOString() };
    store.candidates.unshift(newCandidate);
    writeLocalStore(store);
    return newCandidate;
  },

  async updateCandidate(id, data) {
    if (getIsMongoConnected()) {
      return await Candidate.findByIdAndUpdate(id, data, { new: true });
    }
    const store = readLocalStore();
    if (!store.candidates) store.candidates = [];
    const idx = store.candidates.findIndex(c => c._id === id);
    if (idx !== -1) {
      store.candidates[idx] = { ...store.candidates[idx], ...data, updatedAt: new Date().toISOString() };
      writeLocalStore(store);
      return store.candidates[idx];
    }
    return null;
  },

  async deleteCandidate(id) {
    if (getIsMongoConnected()) {
      return await Candidate.findByIdAndDelete(id);
    }
    const store = readLocalStore();
    if (!store.candidates) store.candidates = [];
    const idx = store.candidates.findIndex(c => c._id === id);
    if (idx !== -1) {
      const removed = store.candidates.splice(idx, 1);
      writeLocalStore(store);
      return removed[0];
    }
    return null;
  }
};

module.exports = dataService;
