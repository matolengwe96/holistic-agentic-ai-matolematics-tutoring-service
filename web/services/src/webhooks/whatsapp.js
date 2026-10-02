// Handler for incoming n8n / Meta WhatsApp callbacks
exports.handleWhatsAppWebhook = (req, res) => {
  console.log('Received WhatsApp Telemetry Event:', req.body);
  res.status(200).json({ status: 'delivered' });
};